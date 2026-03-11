// ====== GO FOR 100 - App Part 2: AI, Exam, Progress, Utilities ======

// ====== PROBLEM PANEL (Playground) ======
function showProblemPanel(problem) {
  currentProblem = problem;
  const panel = document.getElementById('problem-panel');
  panel.classList.remove('hidden');
  document.getElementById('problem-title').textContent = problem.title;
  const diffBadge = document.getElementById('problem-difficulty');
  diffBadge.textContent = problem.difficulty;
  diffBadge.className = 'difficulty-badge ' + problem.difficulty;
  const formattedDesc = (problem.desc || '').replace(/`([^`]+)`/g, '<code style="color:var(--pink)">$1</code>');
  document.getElementById('problem-description').innerHTML = `<p>${formattedDesc}</p>${formatProblemExamples(problem)}`;
  document.getElementById('close-problem-panel').onclick = () => panel.classList.add('hidden');
}

// Problem list for playground
function initPlaygroundProblems() {
  if (document.getElementById('playground-problem-select')) return;
  const toolbar = document.querySelector('.editor-toolbar-left');
  const select = document.createElement('select');
  select.id = 'playground-problem-select';
  select.style.cssText = 'background:var(--surface);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:4px 8px;font-size:12px;margin-left:8px;outline:none;';
  select.innerHTML = '<option value="">Free Code</option>' + PROBLEMS.map(p => `<option value="${p.id}">${p.title} (${p.difficulty})</option>`).join('');
  select.onchange = () => {
    const p = PROBLEMS.find(pr => pr.id === select.value);
    if (p) { editor.setValue(p.starter); showProblemPanel(p); currentProblem = p; }
    else { currentProblem = null; document.getElementById('problem-panel').classList.add('hidden'); }
  };
  toolbar.appendChild(select);
}

// ====== AI ASSISTANT ======
function initAI() {
  const toggle = document.getElementById('ai-toggle');
  const panel = document.getElementById('ai-panel');
  const close = document.getElementById('ai-close');
  const clear = document.getElementById('ai-clear');
  const send = document.getElementById('ai-send');
  const input = document.getElementById('ai-input');
  const badge = document.getElementById('ai-badge');

  toggle.onclick = () => { panel.classList.toggle('hidden'); badge.style.display = 'none'; };
  close.onclick = () => panel.classList.add('hidden');
  clear.onclick = () => {
    document.getElementById('ai-messages').innerHTML = '';
    showToast('Chat cleared', 'info');
  };
  send.onclick = () => sendAIMessage();
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAIMessage(); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 80) + 'px';
  });
  // Quick actions
  document.querySelectorAll('.ai-quick-btn').forEach(btn => {
    btn.onclick = () => {
      const action = btn.dataset.action;
      const code = editor ? editor.getValue() : '';
      let msg = '';
      switch(action) {
        case 'explain': msg = `Explain this code:\n\`\`\`js\n${code}\n\`\`\``; break;
        case 'debug': msg = `Debug this code and find any issues:\n\`\`\`js\n${code}\n\`\`\``; break;
        case 'optimize': msg = `Optimize this code:\n\`\`\`js\n${code}\n\`\`\``; break;
        case 'hint': msg = currentProblem ? `Give me a hint for: ${currentProblem.title} - ${currentProblem.desc}` : 'Give me a JavaScript tip for WAP exam prep.'; break;
      }
      if (msg) { addAIMessage('user', msg); callGroqAPI(msg); }
    };
  });
  updateAIAvatars();
}

function addAIMessage(role, content) {
  const container = document.getElementById('ai-messages');
  const div = document.createElement('div');
  div.className = `ai-message ${role}`;
  const avatar = role === 'assistant' ? `<img src="${CONFIG.AI_AVATAR}" alt="WAP EXPERT" class="ai-msg-avatar" onerror="window.resolveAvatarUrl(this, '${CONFIG.AI_AVATAR}')">` : '';
  const formattedContent = role === 'assistant' ? formatAIResponse(content) : escapeHtml(content).replace(/\n/g, '<br>');
  div.innerHTML = `${avatar}<div class="ai-msg-content">${formattedContent}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function addAIThinking() {
  const container = document.getElementById('ai-messages');
  const div = document.createElement('div');
  div.className = 'ai-message assistant';
  div.id = 'ai-thinking-msg';
  div.innerHTML = `<img src="${CONFIG.AI_AVATAR}" alt="WAP EXPERT" class="ai-msg-avatar" onerror="window.resolveAvatarUrl(this, '${CONFIG.AI_AVATAR}')"><div class="ai-msg-content"><div class="ai-thinking"><div class="ai-thinking-dot"></div><div class="ai-thinking-dot"></div><div class="ai-thinking-dot"></div></div></div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removeAIThinking() {
  const el = document.getElementById('ai-thinking-msg');
  if (el) el.remove();
}

function sendAIMessage() {
  const input = document.getElementById('ai-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  input.style.height = 'auto';
  addAIMessage('user', msg);
  callGroqAPI(msg);
}

async function callGroqAPI(userMessage) {
  if (!CONFIG.GROQ_API_KEY) {
    addAIMessage('assistant', "⚠️ Please set your **Groq API Key** first! Click the settings icon or go to [console.groq.com](https://console.groq.com) to get one.\n\nYou can set it in **Settings** (click the gear icon in the top navigation).");
    document.getElementById('settings-modal').classList.remove('hidden');
    return;
  }
  addAIThinking();
  try {
    const baseUrl = CONFIG.BASE_URL || "https://api.groq.com/openai/v1";
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${CONFIG.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: CONFIG.MODEL,
        messages: [
          { role: "system", content: "You are WAP EXPERT, a friendly and expert JavaScript tutor helping students prepare for WAP (Web Application Programming) exams. Be concise, use code examples, and be encouraging. Format responses with markdown." },
          { role: "user", content: userMessage }
        ],
        max_tokens: 16384,
        temperature: 0.7
      })
    });
    removeAIThinking();
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      addAIMessage('assistant', `⚠️ API Error: ${err.error?.message || response.statusText}. Please check your API key and try again.`);
      return;
    }
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";
    typeAIMessage(reply);
  } catch(e) {
    removeAIThinking();
    addAIMessage('assistant', `⚠️ Network error: ${e.message}. Make sure you have internet connectivity.`);
  }
}

function typeAIMessage(text) {
  const container = document.getElementById('ai-messages');
  const div = document.createElement('div');
  div.className = 'ai-message assistant';
  div.innerHTML = `<img src="${CONFIG.AI_AVATAR}" alt="WAP EXPERT" class="ai-msg-avatar" onerror="window.resolveAvatarUrl(this, '${CONFIG.AI_AVATAR}')"><div class="ai-msg-content"></div>`;
  container.appendChild(div);
  const contentEl = div.querySelector('.ai-msg-content');
  let i = 0;
  const interval = setInterval(() => {
    i += 3;
    contentEl.innerHTML = formatAIResponse(text.substring(0, i));
    container.scrollTop = container.scrollHeight;
    if (i >= text.length) clearInterval(interval);
  }, 10);
}

function formatAIResponse(text) {
  return text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

window.resolveAvatarUrl = async function(el, url) {
  if (!url || !url.startsWith('http') || el.dataset.resolved) {
    el.onerror = null;
    el.src = 'wap_expert.png';
    return;
  }
  
  el.dataset.resolved = 'true';
  el.onerror = null;

  try {
    // 1. Google Images Link
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.searchParams.has('imgurl')) {
        const directUrl = parsedUrl.searchParams.get('imgurl');
        el.src = directUrl;
        
        if (CONFIG.AI_AVATAR === url) {
          CONFIG.AI_AVATAR = directUrl;
          localStorage.setItem('ai_avatar', directUrl);
          updateAIAvatars();
        }
        return;
      }
    } catch(e) {}

    // 2. Pinterest / Website HTML OpenGraph Extraction
    const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`);
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    const ogImage = doc.querySelector('meta[property="og:image"]');
    const twitterImg = doc.querySelector('meta[name="twitter:image:src"]') || doc.querySelector('meta[name="twitter:image"]');
    
    let imgUrl = '';
    if (ogImage && ogImage.content) imgUrl = ogImage.content;
    else if (twitterImg && twitterImg.content) imgUrl = twitterImg.content;

    if (imgUrl && imgUrl.startsWith('http')) {
      el.src = imgUrl;
      
      if (CONFIG.AI_AVATAR === url) {
        CONFIG.AI_AVATAR = imgUrl;
        localStorage.setItem('ai_avatar', imgUrl);
        updateAIAvatars();
      }
      return;
    }
  } catch (e) {
    console.error("Link parser failed:", e);
  }
  
  el.src = 'wap_expert.png';
};

function updateAIAvatars() {
  const url = CONFIG.AI_AVATAR;
  document.querySelectorAll('#ai-avatar-btn, #ai-avatar-header, .ai-msg-avatar').forEach(el => {
    el.onerror = function() { window.resolveAvatarUrl(this, url); };
    el.removeAttribute('data-resolved');
    el.src = url;
  });
}

// ====== EXAM SIMULATOR ======
document.getElementById('start-exam')?.addEventListener('click', startExam);
document.getElementById('exam-submit-btn')?.addEventListener('click', submitExam);
document.getElementById('exam-prev-q')?.addEventListener('click', () => navigateExamQ(-1));
document.getElementById('exam-next-q')?.addEventListener('click', () => navigateExamQ(1));
document.getElementById('retake-exam')?.addEventListener('click', startExam);
document.getElementById('review-exam')?.addEventListener('click', () => { 
  examState.currentQ = 0; 
  document.getElementById('exam-results').classList.add('hidden');
  document.getElementById('exam-active').classList.remove('hidden');
  document.getElementById('exam-submit-btn').style.display = 'none'; // hide submit in review mode
  renderExamQuestion(); 
});

function startExam() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
  const data = generateExamData();
  examState = {
    mcqs: data.mcqs, outputQs: data.outputQs, codingProblems: data.codingProblems,
    answers: {}, currentQ: 0, totalQuestions: data.mcqs.length + data.outputQs.length + data.codingProblems.length,
    startTime: Date.now(), timeLimit: 150 * 60 * 1000 // 2.5 Hours
  };
  document.getElementById('exam-intro').classList.add('hidden');
  document.getElementById('exam-results').classList.add('hidden');
  document.getElementById('exam-active').classList.remove('hidden');
  document.getElementById('exam-submit-btn').style.display = '';
  renderExamNav();
  renderExamQuestion();
  startExamTimer();
}

function renderExamNav() {
  const grid = document.getElementById('exam-nav-grid');
  grid.innerHTML = '';
  for (let i = 0; i < examState.totalQuestions; i++) {
    const btn = document.createElement('button');
    btn.className = 'exam-nav-btn' + (i === examState.currentQ ? ' current' : '') + (examState.answers[i] !== undefined ? ' answered' : '');
    btn.textContent = i + 1;
    btn.onclick = () => { examState.currentQ = i; renderExamQuestion(); renderExamNav(); };
    grid.appendChild(btn);
  }
  document.getElementById('exam-question-counter').textContent = `Q ${examState.currentQ + 1}/${examState.totalQuestions}`;
}

function renderExamQuestion() {
  const q = examState.currentQ;
  const content = document.getElementById('exam-question-content');
  const mcqCount = examState.mcqs.length;
  const outCount = examState.outputQs.length;

  if (q < mcqCount) {
    const mcq = examState.mcqs[q];
    content.innerHTML = `<div class="mcq-question"><h4>MCQ ${q + 1}: ${escapeHtml(mcq.q)}</h4>
      <div class="mcq-options">${mcq.opts.map((o, j) => `<div class="mcq-option ${examState.answers[q] === j ? 'selected' : ''}" data-opt="${j}"><span class="mcq-radio"></span><span>${escapeHtml(o)}</span></div>`).join('')}</div></div>`;
    content.querySelectorAll('.mcq-option').forEach(opt => {
      opt.onclick = () => {
        content.querySelectorAll('.mcq-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        examState.answers[q] = parseInt(opt.dataset.opt);
        renderExamNav();
      };
    });
  } else if (q < mcqCount + outCount) {
    const oq = examState.outputQs[q - mcqCount];
    content.innerHTML = `<div class="output-question"><h4>Output Question ${q - mcqCount + 1}: What is the output?</h4>
      <pre><code>${escapeHtml(oq.code)}</code></pre>
      <input type="text" class="output-input" value="${examState.answers[q] || ''}" placeholder="Type the output..."></div>`;
    content.querySelector('.output-input').oninput = (e) => {
      examState.answers[q] = e.target.value;
      renderExamNav();
    };
  } else {
    const cp = examState.codingProblems[q - mcqCount - outCount];
    const formattedDesc = (cp.desc || cp.title || '').replace(/`([^`]+)`/g, '<code style="color:var(--pink)">$1</code>');
    content.innerHTML = `
      <div class="coding-exercise-split">
        <div class="coding-exercise-left">
          <h4>
            Coding ${q - mcqCount - outCount + 1}: ${cp.title}
            <span class="difficulty-badge ${cp.difficulty || 'hard'}" style="float:right">${cp.difficulty || 'Hard'} • 40 Marks</span>
          </h4>
          <div style="font-size: 11px; color: var(--text-muted); margin: 8px 0; display:flex; gap: 12px; border-bottom: 1px solid var(--border); padding-bottom: 12px;">
            <span>Time Limit: 2s</span><span>Memory Limit: 128MB</span>
          </div>
          <p style="margin-top: 16px">${formattedDesc}</p>
          ${formatProblemExamples(cp)}
        </div>
        <div class="coding-exercise-right">
          <div id="exam-editor" class="mini-editor-container"></div>
          <div class="coding-exercise-right-bottom">
            <button class="btn btn-accent btn-sm" id="exam-test-btn" style="margin-bottom:8px">Test Code</button>
            <div id="exam-test-output" class="coding-exercise-output"><span style="color:var(--text-muted)">Test your code above</span></div>
          </div>
        </div>
      </div>`;
    require(['vs/editor/editor.main'], function() {
      const theme = document.documentElement.getAttribute('data-theme');
      const examEditor = monaco.editor.create(document.getElementById('exam-editor'), {
        value: examState.answers[q] || cp.starter,
        language: 'javascript', theme: theme === 'dark' ? 'gofor100dark' : 'gofor100light',
        fontSize: 13, minimap: { enabled: false }, automaticLayout: true, lineNumbers: 'on',
        scrollBeyondLastLine: false, wordWrap: 'on', tabSize: 2,
      });
      examEditor.onDidChangeModelContent(() => { examState.answers[q] = examEditor.getValue(); renderExamNav(); });
      document.getElementById('exam-test-btn').onclick = async () => {
        const code = examEditor.getValue();
        const out = document.getElementById('exam-test-output');
        let html = '';
        for (let i = 0; i < cp.tests.length; i++) {
          const tc = cp.tests[i];
          const r = await executeCodeForTest(code, tc.input);
          const pass = r.success && r.value === tc.expected;
          html += `<div class="test-result ${pass ? 'pass' : 'fail'}"><span>Test ${i + 1}</span><span>${pass ? '✅' : '❌'}</span></div>`;
        }
        out.innerHTML = html;
      };
    });
  }
  renderExamNav();
}

function navigateExamQ(dir) {
  const next = examState.currentQ + dir;
  if (next >= 0 && next < examState.totalQuestions) {
    examState.currentQ = next;
    renderExamQuestion();
  }
}

let examTimerInterval;
function startExamTimer() {
  clearInterval(examTimerInterval);
  examTimerInterval = setInterval(() => {
    const elapsed = Date.now() - examState.startTime;
    const remaining = Math.max(0, examState.timeLimit - elapsed);
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    const display = document.getElementById('exam-time-display');
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const timer = document.getElementById('exam-timer');
    timer.classList.toggle('warning', remaining < 600000 && remaining > 120000);
    timer.classList.toggle('danger', remaining <= 120000);
    if (remaining <= 0) { clearInterval(examTimerInterval); submitExam(); }
  }, 1000);
}

async function submitExam() {
  clearInterval(examTimerInterval);
  let mcqScore = 0, outScore = 0, codeScore = 0;
  const mcqCount = examState.mcqs.length;
  const outCount = examState.outputQs.length;
  examState.mcqs.forEach((m, i) => { if (examState.answers[i] === m.ans) mcqScore++; });
  examState.outputQs.forEach((o, i) => { if ((examState.answers[i + mcqCount] || '').trim() === o.answer) outScore++; });
  
  for (let i = 0; i < examState.codingProblems.length; i++) {
    const cp = examState.codingProblems[i];
    const code = examState.answers[i + mcqCount + outCount];
    if (code) {
      let allPass = true;
      for (const tc of cp.tests) {
        const r = await executeCodeForTest(code, tc.input);
        if (!r.success || r.value !== tc.expected) allPass = false;
      }
      if (allPass) codeScore++;
    }
  }
  
  const mcqMarks = Math.round((mcqScore / mcqCount) * 30);
  const outMarks = Math.round((outScore / outCount) * 30);
  const codeMarks = Math.round((codeScore / examState.codingProblems.length) * 40);
  const total = mcqMarks + outMarks + codeMarks;

  document.getElementById('exam-active').classList.add('hidden');
  document.getElementById('exam-results').classList.remove('hidden');
  document.getElementById('result-score').textContent = total;
  document.getElementById('rb-mcq').textContent = `${mcqScore}/${mcqCount}`;
  document.getElementById('rb-output').textContent = `${outScore}/${outCount}`;
  document.getElementById('rb-coding').textContent = `${codeScore}/${examState.codingProblems.length}`;

  const arc = document.getElementById('score-arc');
  const pct = total / 100;
  arc.style.strokeDashoffset = 339.292 * (1 - pct);
  arc.style.stroke = total >= 60 ? 'var(--green)' : total >= 40 ? 'var(--orange)' : 'var(--red)';

  saveExamResult(total, mcqScore, outScore, codeScore);
  updateProgress('examsTaken', p => p + 1);
  updateProgress('bestExamScore', p => Math.max(p, total));
}

function saveExamResult(total, mcq, out, code) {
  const results = JSON.parse(localStorage.getItem('exam_results') || '[]');
  results.unshift({ total, mcq, out, code, date: new Date().toLocaleString() });
  localStorage.setItem('exam_results', JSON.stringify(results));
}
function loadPreviousExamResults() {
  const results = JSON.parse(localStorage.getItem('exam_results') || '[]');
  if (results.length > 0) {
    const container = document.getElementById('prev-exam-results');
    container.classList.remove('hidden');
    document.getElementById('prev-results-list').innerHTML = results.slice(0, 5).map(r =>
      `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);font-size:13px"><span>${r.date}</span><span style="font-weight:700;color:${r.total >= 60 ? 'var(--green)' : 'var(--red)'}">${r.total}/100</span></div>`
    ).join('');
  }
}

// ====== PROGRESS ======
function getProgress() { return JSON.parse(localStorage.getItem('progress') || '{"completedTopicIds":[],"solved":0,"totalRuns":0,"examsTaken":0,"bestExamScore":0,"perfectMCQ":0,"streak":0,"mcqScores":{},"lastActiveDate":""}'); }
function saveProgress(p) { localStorage.setItem('progress', JSON.stringify(p)); }
function updateProgress(key, fn) {
  const p = getProgress();
  p[key] = fn(p[key] || 0);
  saveProgress(p);
}
function saveMCQScore(topicId, score) {
  const p = getProgress();
  if (!p.mcqScores) p.mcqScores = {};
  p.mcqScores[topicId] = Math.max(p.mcqScores[topicId] || 0, score);
  saveProgress(p);
}
function updateStreak() {
  const p = getProgress();
  const today = new Date().toDateString();
  if (p.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    p.streak = p.lastActiveDate === yesterday ? (p.streak || 0) + 1 : 1;
    p.lastActiveDate = today;
    saveProgress(p);
  }
  document.getElementById('streak-count').textContent = p.streak || 0;
}

function renderProgress() {
  const p = getProgress();
  const completedTopics = (p.completedTopicIds || []).length;
  const totalTopics = 21;
  const pct = Math.round((completedTopics / totalTopics) * 100);

  // Overall arc
  const arc = document.getElementById('overall-progress-arc');
  arc.style.strokeDashoffset = 339.292 * (1 - pct / 100);
  document.getElementById('overall-pct').textContent = pct + '%';

  // Topics bar
  document.getElementById('topics-progress-bar').style.width = pct + '%';
  document.getElementById('topics-progress-text').textContent = `${completedTopics}/${totalTopics}`;

  // Problems bar
  const solved = p.solved || 0;
  document.getElementById('problems-progress-bar').style.width = Math.min(100, (solved / 20) * 100) + '%';
  document.getElementById('problems-progress-text').textContent = solved;

  // MCQ avg
  const scores = Object.values(p.mcqScores || {});
  const avgMCQ = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  document.getElementById('mcq-progress-bar').style.width = avgMCQ + '%';
  document.getElementById('mcq-progress-text').textContent = avgMCQ + '%';

  // Charts
  renderCharts(p);
  renderBadges(p);
}

function renderCharts(p) {
  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue('--accent').trim();
  const accent2 = style.getPropertyValue('--accent2').trim();
  const textMuted = style.getPropertyValue('--text-muted').trim();

  // Activity chart
  const actCtx = document.getElementById('activity-chart');
  if (actCtx._chart) actCtx._chart.destroy();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  actCtx._chart = new Chart(actCtx, {
    type: 'bar', data: {
      labels: days,
      datasets: [{ label: 'Activity', data: days.map(() => Math.floor(Math.random() * 10) + (p.totalRuns || 0 > 0 ? 1 : 0)), backgroundColor: accent + '80', borderRadius: 6, borderColor: accent, borderWidth: 1 }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: textMuted } }, x: { ticks: { color: textMuted } } } }
  });

  // Mastery chart
  const masCtx = document.getElementById('mastery-chart');
  if (masCtx._chart) masCtx._chart.destroy();
  const topicNames = TOPICS.slice(0, 7).map(t => t.title.substring(0, 10));
  const topicScores = TOPICS.slice(0, 7).map(t => p.mcqScores?.[t.id] || 0);
  masCtx._chart = new Chart(masCtx, {
    type: 'radar', data: {
      labels: topicNames,
      datasets: [{ label: 'Mastery', data: topicScores, backgroundColor: accent + '30', borderColor: accent, pointBackgroundColor: accent, pointBorderColor: '#fff' }]
    },
    options: { responsive: true, scales: { r: { beginAtZero: true, max: 100, ticks: { color: textMuted, backdropColor: 'transparent' }, grid: { color: textMuted + '30' }, pointLabels: { color: textMuted, font: { size: 10 } } } }, plugins: { legend: { display: false } } }
  });
}

function renderBadges(p) {
  const progress = { ...p, completedTopics: (p.completedTopicIds || []).length };
  const grid = document.getElementById('badges-grid');
  grid.innerHTML = BADGES.map(b => {
    const unlocked = b.check(progress);
    return `<div class="badge-card ${unlocked ? '' : 'locked'}"><span class="badge-icon">${b.icon}</span><div class="badge-name">${b.name}</div><div class="badge-desc">${b.desc}</div></div>`;
  }).join('');
}

// ====== THEME ======
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('theme-toggle').onclick = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    if (editor) monaco.editor.setTheme(next === 'dark' ? 'gofor100dark' : 'gofor100light');
    if (miniEditor) monaco.editor.setTheme(next === 'dark' ? 'gofor100dark' : 'gofor100light');
    document.querySelector('.icon-sun').classList.toggle('hidden', next === 'light');
    document.querySelector('.icon-moon').classList.toggle('hidden', next === 'dark');
  };
  document.querySelector('.icon-sun').classList.toggle('hidden', saved === 'light');
  document.querySelector('.icon-moon').classList.toggle('hidden', saved === 'dark');
}

// ====== SETTINGS ======
function initSettings() {
  // Add settings button to nav
  const navRight = document.querySelector('.nav-right');
  const settingsBtn = document.createElement('button');
  settingsBtn.className = 'nav-btn';
  settingsBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
  settingsBtn.onclick = () => document.getElementById('settings-modal').classList.remove('hidden');
  navRight.insertBefore(settingsBtn, navRight.firstChild);

  // Load settings
  document.getElementById('setting-api-key').value = CONFIG.GROQ_API_KEY;
  document.getElementById('setting-avatar-url').value = CONFIG.AI_AVATAR === 'wap_expert.png' ? '' : CONFIG.AI_AVATAR;
  document.getElementById('setting-font-size').value = CONFIG.EDITOR_FONT_SIZE;
  document.getElementById('font-size-display').textContent = CONFIG.EDITOR_FONT_SIZE + 'px';

  document.getElementById('setting-font-size').oninput = (e) => {
    document.getElementById('font-size-display').textContent = e.target.value + 'px';
  };

  document.getElementById('save-settings').onclick = () => {
    const apiKey = document.getElementById('setting-api-key').value.trim();
    const avatarUrl = document.getElementById('setting-avatar-url').value.trim();
    const fontSize = parseInt(document.getElementById('setting-font-size').value);
    CONFIG.GROQ_API_KEY = apiKey;
    CONFIG.EDITOR_FONT_SIZE = fontSize;
    CONFIG.AI_AVATAR = avatarUrl || 'wap_expert.png';
    
    localStorage.setItem('groq_api_key', apiKey);
    if (avatarUrl) {
      localStorage.setItem('ai_avatar', avatarUrl);
    } else {
      localStorage.removeItem('ai_avatar');
    }
    localStorage.setItem('editor_font_size', fontSize);
    if (editor) editor.updateOptions({ fontSize });
    updateAIAvatars();
    document.getElementById('settings-modal').classList.add('hidden');
    showToast('Settings saved! ✅', 'success');
  };

  // Close modal
  document.querySelector('.modal-close')?.addEventListener('click', () => document.getElementById('settings-modal').classList.add('hidden'));
  document.querySelector('.modal-overlay')?.addEventListener('click', () => document.getElementById('settings-modal').classList.add('hidden'));
}

// ====== UTILITIES ======
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(20px)'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// Init playground problem list after Monaco loads
setTimeout(() => initPlaygroundProblems(), 3000);
