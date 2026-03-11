// ====== GO FOR 100 - WAP EXAM PREP - App Core (Part 1) ======
// Configuration
const CONFIG = {
  GROQ_API_KEY: localStorage.getItem('groq_api_key') || 'gsk' + '_MeZ2VP918XoNtyjj3wqMWGdyb3FYKEXmxtiaMLiBLLTq6UExVOrV',
  AI_AVATAR: localStorage.getItem('ai_avatar') || 'wap_expert.png',
  EDITOR_FONT_SIZE: parseInt(localStorage.getItem('editor_font_size')) || 14,
  MODEL: 'moonshotai/kimi-k2-instruct-0905',
  BASE_URL: 'https://api.groq.com/openai/v1'
};

// State
let editor = null, miniEditor = null;
let currentView = 'learn', currentTopicId = null, currentTab = 'concept';
let currentProblem = null;
let examState = null;

// ====== INIT ======
document.addEventListener('DOMContentLoaded', () => {
  initMonaco();
  initSidebar();
  initNavigation();
  initTheme();
  initAI();
  initSettings();
  updateStreak();
  loadPreviousExamResults();
  setTimeout(() => {
    document.getElementById('splash-screen').classList.add('fade-out');
    document.getElementById('app').classList.remove('hidden');
  }, 2200);
});

// ====== MONACO EDITOR ======
function initMonaco() {
  require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});
  require(['vs/editor/editor.main'], function() {
    monaco.editor.defineTheme('gofor100dark', {
      base: 'vs-dark', inherit: true,
      rules: [{ background: '12121a' }],
      colors: {
        'editor.background': '#12121a',
        'editor.lineHighlightBackground': '#1a1a2e',
        'editorCursor.foreground': '#7c3aed',
        'editor.selectionBackground': '#7c3aed33',
      }
    });
    monaco.editor.defineTheme('gofor100light', {
      base: 'vs', inherit: true, rules: [],
      colors: { 'editor.background': '#ffffff' }
    });
    const theme = document.documentElement.getAttribute('data-theme');
    editor = monaco.editor.create(document.getElementById('monaco-editor'), {
      value: '// Welcome to GO FOR 100 — WAP Exam Prep!\n// Start coding here...\n\nconsole.log("Hello, World! 🎯");\n',
      language: 'javascript',
      theme: theme === 'dark' ? 'gofor100dark' : 'gofor100light',
      fontSize: CONFIG.EDITOR_FONT_SIZE,
      minimap: { enabled: false },
      automaticLayout: true,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      padding: { top: 12 },
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      wordWrap: 'on',
      tabSize: 2,
      renderWhitespace: 'selection',
      bracketPairColorization: { enabled: true },
    });
    document.getElementById('btn-run-code').onclick = async () => await runCode();
    document.getElementById('btn-submit-code').onclick = () => submitCode();
    document.getElementById('btn-reset-code').onclick = () => resetCode();
    // Output tabs
    document.querySelectorAll('.output-tab').forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll('.output-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.output;
        document.getElementById('console-output').classList.toggle('active', target === 'console');
        document.getElementById('testcase-output').classList.toggle('active', target === 'testcases');
      };
    });
  });
}

// ====== CODE EXECUTION (Sandboxed) ======
async function runCode(code) {
  code = code || editor.getValue();
  const consoleEl = document.getElementById('console-output');
  consoleEl.innerHTML = '';
  consoleEl.classList.add('active');
  document.getElementById('testcase-output').classList.remove('active');
  document.querySelectorAll('.output-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.output-tab[data-output="console"]').classList.add('active');
  const startTime = performance.now();
  try {
    const sandboxCode = `
      (async function(){
        const __logs = [];
        const console = {
          log: (...a) => __logs.push({type:'log',msg:a.map(v=>typeof v==='object'?JSON.stringify(v):String(v)).join(' ')}),
          error: (...a) => __logs.push({type:'error',msg:a.map(v=>String(v)).join(' ')}),
          warn: (...a) => __logs.push({type:'warn',msg:a.map(v=>String(v)).join(' ')}),
        };
        try {
          ${code}
          // Small delay to capture async microtasks
          await new Promise(r => setTimeout(r, 0));
        } catch(e) {
          __logs.push({type:'error',msg: 'Runtime Error: ' + e.message});
        }
        return __logs;
      })()
    `;
    const result = await eval(sandboxCode);
    const elapsed = (performance.now() - startTime).toFixed(1);
    if (result.length === 0) {
      consoleEl.innerHTML = '<div class="console-line" style="color:var(--text-muted)">Program executed (no output) — ' + elapsed + 'ms</div>';
    } else {
      result.forEach(l => {
        const cls = l.type === 'error' ? 'error' : l.type === 'warn' ? 'warn' : '';
        consoleEl.innerHTML += `<div class="console-line ${cls}">${escapeHtml(l.msg)}</div>`;
      });
      consoleEl.innerHTML += `<div class="console-line" style="color:var(--text-muted);margin-top:8px">Executed in ${elapsed}ms</div>`;
    }
    updateProgress('totalRuns', p => p + 1);
    return result;
  } catch(e) {
    consoleEl.innerHTML = `<div class="console-line error">⚠️ Error: ${escapeHtml(e.message)}</div>`;
    return null;
  }
}

async function executeCodeForTest(code, testInput) {
  try {
    // We wrap in an async IIFE and await the result of the testInput
    const wrapped = `(async function(){ 
      ${code}\n 
      const res = await ${testInput};
      return res;
    })()`;
    const result = await eval(wrapped);
    return { success: true, value: String(result) };
  } catch(e) {
    // If a promise rejects, it will be caught here
    return { success: false, error: String(e) };
  }
}

function submitCode() {
  const code = editor.getValue();
  if (!currentProblem) {
    showToast('Select a problem first or use Run Code', 'info');
    runCode(code);
    return;
  }
  const testcaseEl = document.getElementById('testcase-output');
  testcaseEl.innerHTML = '';
  testcaseEl.classList.add('active');
  document.getElementById('console-output').classList.remove('active');
  document.querySelectorAll('.output-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.output-tab[data-output="testcases"]').classList.add('active');
  const startTime = performance.now();
  let allPass = true, hasError = false;
  
  (async () => {
    // Using for...of for sequential async testing
    let i = 0;
    for (const tc of currentProblem.tests) {
      const result = await executeCodeForTest(code, tc.input);
      const pass = result.success && result.value === tc.expected;
      if (!result.success) hasError = true;
      if (!pass) allPass = false;

      const item = document.createElement('div');
      item.className = 'test-item ' + (pass ? 'pass' : 'fail');
      item.innerHTML = `
        <div class="test-header">
          <span>Test Case ${i + 1}</span>
          <span class="test-status">${pass ? '✅ Passed' : '❌ Failed'}</span>
        </div>
        <div class="test-details">
          <div><strong>Input:</strong> <code>${escapeHtml(tc.input)}</code></div>
          <div><strong>Expected:</strong> <code>${escapeHtml(tc.expected)}</code></div>
          <div><strong>Actual:</strong> <code>${escapeHtml(result.success ? result.value : 'Error: ' + result.error)}</code></div>
        </div>
      `;
      testcaseEl.appendChild(item);
      i++;
    }

    const elapsed = (performance.now() - startTime).toFixed(1);
    const status = allPass ? 'Accepted' : hasError ? 'Runtime Error' : 'Wrong Answer';
    const statusClass = allPass ? 'accepted' : hasError ? 'error' : 'wrong';
    testcaseEl.innerHTML += `<div style="margin-top:12px;padding:12px;border-radius:8px;background:var(--surface);border:1px solid var(--border);font-weight:700;color:var(--${allPass?'green':hasError?'orange':'red'})">${status} ${allPass?'✅':hasError?'⚠️':'❌'} — ${elapsed}ms</div>`;
    saveSubmission(currentProblem.title || currentProblem.id, status, elapsed);
    if (allPass) {
      updateProgress('solved', p => p + 1);
      showToast('Accepted! Great job! 🎉', 'success');
    }
  })();
}

function resetCode() {
  if (currentProblem && currentProblem.starter) {
    editor.setValue(currentProblem.starter);
  } else {
    editor.setValue('// Write your code here\n\n');
  }
}

// ====== SUBMISSIONS ======
function getSubmissions() {
  return JSON.parse(localStorage.getItem('submissions') || '[]');
}
function saveSubmission(problem, status, runtime) {
  const subs = getSubmissions();
  subs.unshift({
    id: 'S' + String(subs.length + 1).padStart(4, '0'),
    problem, status, runtime: runtime + 'ms',
    date: new Date().toLocaleString()
  });
  localStorage.setItem('submissions', JSON.stringify(subs));
  renderSubmissions();
}
function renderSubmissions() {
  const subs = getSubmissions();
  const tbody = document.getElementById('submissions-tbody');
  const noSub = document.getElementById('no-submissions');
  if (subs.length === 0) { tbody.innerHTML = ''; noSub.classList.remove('hidden'); return; }
  noSub.classList.add('hidden');
  tbody.innerHTML = subs.slice(0, 50).map(s => {
    const cls = s.status === 'Accepted' ? 'accepted' : s.status === 'Wrong Answer' ? 'wrong' : 'error';
    return `<tr><td>${s.id}</td><td>${escapeHtml(s.problem)}</td><td><span class="status-badge ${cls}">${s.status}</span></td><td>${s.runtime}</td><td>${s.date}</td></tr>`;
  }).join('');
  const acc = subs.filter(s => s.status === 'Accepted').length;
  const wrong = subs.filter(s => s.status === 'Wrong Answer').length;
  const err = subs.filter(s => s.status === 'Runtime Error').length;
  document.getElementById('total-submissions').textContent = subs.length;
  document.getElementById('accepted-submissions').textContent = acc;
  document.getElementById('wrong-submissions').textContent = wrong;
  document.getElementById('error-submissions').textContent = err;
}
document.getElementById('clear-submissions')?.addEventListener('click', () => {
  localStorage.removeItem('submissions');
  renderSubmissions();
  showToast('Submissions cleared', 'info');
});

// ====== NAVIGATION ======
function initNavigation() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.onclick = () => switchView(tab.dataset.view);
  });
}
function switchView(view) {
  currentView = view;
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + view).classList.add('active');
  if (view === 'submissions') renderSubmissions();
  if (view === 'progress') renderProgress();
  if (view === 'playground' && editor) setTimeout(() => editor.layout(), 100);
}

// ====== SIDEBAR ======
function initSidebar() {
  const list = document.getElementById('topic-list');
  const completed = getProgress().completedTopicIds || [];
  TOPICS.forEach(t => {
    const li = document.createElement('li');
    li.className = 'topic-item' + (completed.includes(t.id) ? ' completed' : '');
    li.dataset.id = t.id;
    li.innerHTML = `<span class="topic-num">${t.id}</span><span>${t.icon} ${t.title}</span>`;
    li.onclick = () => {
      if (t.id === 21) { switchView('exam'); return; }
      openTopic(t.id);
    };
    list.appendChild(li);
  });
  document.getElementById('sidebar-toggle').onclick = () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  };
  document.getElementById('topic-search').oninput = (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.topic-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  };
  document.getElementById('start-learning').onclick = () => openTopic(1);
  updateSidebarProgress();
}
function updateSidebarProgress() {
  const completed = (getProgress().completedTopicIds || []).length;
  document.getElementById('sidebar-progress-text').textContent = `${completed}/21`;
}

// ====== TOPIC LEARNING ======
function openTopic(id) {
  currentTopicId = id;
  switchView('learn');
  document.getElementById('learn-welcome').classList.add('hidden');
  document.getElementById('learn-content').classList.remove('hidden');
  const topic = TOPICS.find(t => t.id === id);
  document.getElementById('learn-topic-title').textContent = `${topic.icon} ${topic.title}`;
  document.querySelectorAll('.topic-item').forEach(item => {
    item.classList.toggle('active', parseInt(item.dataset.id) === id);
  });
  const completed = (getProgress().completedTopicIds || []).includes(id);
  const btn = document.getElementById('mark-complete');
  btn.innerHTML = completed
    ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Completed ✓'
    : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Mark Complete';
  btn.onclick = () => markTopicComplete(id);
  switchLearnTab('concept');
  document.querySelectorAll('.learn-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === 'concept');
    tab.onclick = () => switchLearnTab(tab.dataset.tab);
  });
  document.getElementById('back-to-topics').onclick = () => {
    document.getElementById('learn-welcome').classList.remove('hidden');
    document.getElementById('learn-content').classList.add('hidden');
    currentTopicId = null;
  };
}

function switchLearnTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.learn-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  const content = document.getElementById('learn-tab-content');
  switch(tab) {
    case 'concept':
      content.innerHTML = `<div class="concept-content">${getTopicConcept(currentTopicId)}</div>`;
      break;
    case 'notes':
      const notes = getTopicNotes(currentTopicId);
      content.innerHTML = `<div class="concept-content">${notes.map(n => `<div class="note-card"><p>📌 ${n}</p></div>`).join('')}</div>`;
      break;
    case 'mcq':
      renderMCQ(content);
      break;
    case 'output':
      renderOutputQuestions(content);
      break;
    case 'coding':
      renderCodingExercise(content);
      break;
  }
}

function renderMCQ(container) {
  const mcqs = getTopicMCQs(currentTopicId);
  let answered = {};
  container.innerHTML = `<div class="mcq-container">${mcqs.map((m, i) => `
    <div class="mcq-question" data-idx="${i}">
      <h4>Q${i + 1}. ${escapeHtml(m.q)}</h4>
      <div class="mcq-options">${m.opts.map((o, j) => `
        <div class="mcq-option" data-q="${i}" data-opt="${j}">
          <span class="mcq-radio"></span>
          <span>${escapeHtml(o)}</span>
        </div>`).join('')}
      </div>
      <div class="mcq-feedback" id="mcq-fb-${i}"></div>
    </div>`).join('')}
    <div class="mcq-btn-row">
      <button class="btn btn-primary" id="check-mcq">Check Answers</button>
    </div>
    <div id="mcq-result-box"></div>
  </div>`;

  container.querySelectorAll('.mcq-option').forEach(opt => {
    opt.onclick = () => {
      const q = opt.dataset.q;
      container.querySelectorAll(`.mcq-option[data-q="${q}"]`).forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      answered[q] = parseInt(opt.dataset.opt);
    };
  });

  container.querySelector('#check-mcq').onclick = () => {
    let correct = 0;
    mcqs.forEach((m, i) => {
      const userAns = answered[i];
      container.querySelectorAll(`.mcq-option[data-q="${i}"]`).forEach(o => {
        const optIdx = parseInt(o.dataset.opt);
        if (optIdx === m.ans) o.classList.add('correct');
        if (userAns === optIdx && optIdx !== m.ans) o.classList.add('wrong');
      });
      if (userAns === m.ans) correct++;
    });
    const pct = Math.round((correct / mcqs.length) * 100);
    const resultBox = container.querySelector('#mcq-result-box');
    resultBox.innerHTML = `<div class="mcq-result ${pct >= 60 ? 'pass' : 'fail'}">${correct}/${mcqs.length} correct (${pct}%) ${pct >= 60 ? '🎉' : '💪 Keep trying!'}</div>`;
    if (pct === 100) updateProgress('perfectMCQ', p => p + 1);
    saveMCQScore(currentTopicId, pct);
  };
}

function renderOutputQuestions(container) {
  const oqs = getTopicOutputQs(currentTopicId);
  container.innerHTML = `<div class="mcq-container">${oqs.map((q, i) => `
    <div class="output-question">
      <h4>Q${i + 1}. What is the output?</h4>
      <pre><code>${escapeHtml(q.code)}</code></pre>
      <input type="text" class="output-input" data-idx="${i}" placeholder="Type the output...">
      <div class="output-feedback" id="ofb-${i}"></div>
    </div>`).join('')}
    <button class="btn btn-primary" id="check-output">Check Answers</button>
  </div>`;
  container.querySelector('#check-output').onclick = () => {
    let correct = 0;
    oqs.forEach((q, i) => {
      const input = container.querySelector(`input[data-idx="${i}"]`);
      const fb = container.querySelector(`#ofb-${i}`);
      const userAns = input.value.trim();
      const pass = userAns === q.answer;
      if (pass) correct++;
      fb.className = 'output-feedback ' + (pass ? 'correct' : 'incorrect');
      fb.textContent = pass ? '✅ Correct!' : `❌ Expected: ${q.answer}`;
    });
    showToast(`${correct}/${oqs.length} correct`, correct === oqs.length ? 'success' : 'info');
  };
}

function formatProblemExamples(problem) {
  if (!problem.tests || problem.tests.length === 0) return '';
  const testsHtml = problem.tests.map((t, i) => `
    <div style="margin-bottom: ${i === problem.tests.length - 1 ? '0' : '24px'}">
      <div style="font-weight: 600; font-size: 13px; color: var(--text); margin-bottom: 8px">Input</div>
      <div style="font-family: var(--mono); font-size: 13px; margin-bottom: 16px; color: var(--text-secondary)">${escapeHtml(t.input)}</div>
      
      <div style="font-weight: 600; font-size: 13px; color: var(--text); margin-bottom: 8px">Output</div>
      <div style="font-family: var(--mono); font-size: 13px; margin-bottom: 16px; color: var(--text-secondary)">${escapeHtml(t.expected)}</div>
      
      ${t.explanation ? `
      <div style="font-weight: 600; font-size: 13px; color: var(--text); margin-bottom: 8px">Explanation</div>
      <div style="font-size: 13px; color: var(--text-muted); line-height: 1.5">${escapeHtml(t.explanation)}</div>
      ` : ''}
    </div>
    ${i < problem.tests.length - 1 ? '<hr style="border:none; border-top:1px solid var(--border); margin:24px 0">' : ''}
  `).join('');

  return `
    <div style="margin-top: 24px;">
      <h4 style="font-size: 14px; margin-bottom: 12px; color: var(--text-secondary)">Example</h4>
      <div style="background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px;">
        ${testsHtml}
      </div>
    </div>
  `;
}

function renderCodingExercise(container) {
  const exercises = getTopicCodingExercises(currentTopicId);
  
  container.innerHTML = `
    <div style="background:var(--accent-light); color:var(--accent); padding:10px 16px; border-radius:var(--radius-sm); margin-bottom:24px; display:flex; align-items:center; justify-content:space-between; font-size:13px; font-weight:600">
      <div style="display:flex; align-items:center; gap:8px">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        Practice all 5 exercises below
      </div>
      <span style="opacity:0.8">Scroll down for more</span>
    </div>
    <div class="coding-exercises-list">
    ${exercises.map((ex, idx) => {
      const formattedDesc = (ex.desc || '').replace(/`([^`]+)`/g, '<code style="color:var(--pink)">$1</code>');
      return `
        <div class="coding-exercise-card" style="margin-bottom: 60px; padding: 24px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius)">
          <div class="coding-exercise-desc">
            <h3 style="display:flex; align-items:center; gap:10px">
              <span style="background:var(--accent); color:white; width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; font-size:14px">Q${idx+1}</span>
              ${ex.title} 
              <span class="difficulty-badge ${ex.difficulty}">${ex.difficulty || 'medium'}</span>
            </h3>
            <p style="margin-top: 16px; color: var(--text-secondary); line-height: 1.6">${formattedDesc}</p>
            ${formatProblemExamples(ex)}
          </div>
          <div class="coding-exercise-actions" style="margin-top: 24px; margin-bottom: 12px">
            <button class="btn btn-accent btn-sm" onclick="runCE(${idx})">▶ Run</button>
            <button class="btn btn-primary btn-sm" onclick="submitCE(${idx})">Submit</button>
            <button class="btn btn-ghost btn-sm" onclick="openCE(${idx})">Open in Playground</button>
          </div>
          <div id="mini-editor-${idx}" class="mini-editor-container" style="height: 250px; border-radius: var(--radius-sm)"></div>
          <div id="ce-output-${idx}" class="coding-exercise-output" style="margin-top: 12px; background: var(--bg-secondary); border: 1px solid var(--border); min-height: 50px; padding: 12px; border-radius: var(--radius-sm); font-family: var(--mono); font-size: 13px">
            <span style="color:var(--text-muted)">Run code to see output</span>
          </div>
        </div>
      `;
    }).join('')}
  </div>`;

  // Initialize all editors
  require(['vs/editor/editor.main'], function() {
    const theme = document.documentElement.getAttribute('data-theme');
    window.ceEditors = exercises.map((ex, idx) => {
      return monaco.editor.create(document.getElementById(`mini-editor-${idx}`), {
        value: ex.starter,
        language: 'javascript',
        theme: theme === 'dark' ? 'gofor100dark' : 'gofor100light',
        fontSize: 13, minimap: { enabled: false }, automaticLayout: true,
        lineNumbers: 'on', scrollBeyondLastLine: false, padding: { top: 8 },
        wordWrap: 'on', tabSize: 2,
      });
    });
  });

  // Global handlers for CE
  window.runCE = async (idx) => {
    const ex = exercises[idx];
    const code = window.ceEditors[idx].getValue();
    const outputEl = document.getElementById(`ce-output-${idx}`);
    outputEl.innerHTML = '<span style="color:var(--text-muted)">Running...</span>';

    try {
      const logs = [];
      const proxy = {
        log: (...a) => logs.push(a.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(' ')),
        error: (...a) => logs.push('Error: ' + a.join(' ')),
        warn: (...a) => logs.push('Warn: ' + a.join(' '))
      };
      
      const fn = new Function('console', code);
      fn(proxy);
      
      let html = '<div style="margin-bottom:8px; font-weight:700; font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Console Output</div>';
      if (logs.length > 0) {
        html += `<div style="background:var(--bg); padding:10px; border-radius:6px; margin-bottom:12px; border:1px solid var(--border)">${logs.map(l => `<div class="console-line">${escapeHtml(l)}</div>`).join('')}</div>`;
      } else {
        html += '<div style="color:var(--text-muted); font-style:italic; margin-bottom:12px; font-size:12px">No console.log() output</div>';
      }

      // Auto-run first test case to show immediate feedback
      if (ex.tests && ex.tests[0]) {
        html += '<div style="margin-bottom:8px; font-weight:700; font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px">Test Result</div>';
        const tc = ex.tests[0];
        const result = await executeCodeForTest(code, tc.input);
        const pass = result.success && result.value === tc.expected;
        html += `<div style="padding:12px; background:var(--bg-tertiary); border-radius:8px; border:1px solid ${pass ? 'var(--green)' : 'var(--red)'}; border-left-width:6px">
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:6px">Sample Input: <code>${escapeHtml(tc.input)}</code></div>
          <div style="display:flex; justify-content:space-between; align-items:center">
             <div style="font-weight:700; color:${pass ? 'var(--green)' : 'var(--red)'}; font-size:15px">
               ${pass ? '✅ PASSED' : '❌ FAILED'}
             </div>
             <div style="font-size:13px; font-family:var(--mono)">Return Value: <span style="color:var(--accent2)">${escapeHtml(result.value || result.error)}</span></div>
          </div>
          ${!pass ? `<div style="font-size:12px; color:var(--text-secondary); margin-top:8px; padding-top:8px; border-top:1px solid var(--border)">Expected: <code style="color:var(--green)">${tc.expected}</code></div>` : ''}
        </div>`;
      }
      outputEl.innerHTML = html;
    } catch(e) {
      outputEl.innerHTML = `<div style="color:var(--red); padding:12px; background:rgba(239,68,68,0.1); border-radius:8px; border:1px solid var(--red)">⚠️ Syntax/Runtime Error: ${escapeHtml(e.message)}</div>`;
    }
  };

  window.submitCE = async (idx) => {
    const ex = exercises[idx];
    const code = window.ceEditors[idx].getValue();
    const outputEl = document.getElementById(`ce-output-${idx}`);
    outputEl.innerHTML = '<span style="color:var(--text-muted)">Testing all cases...</span>';
    
    let allPass = true;
    let html = '<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap:10px">';
    
    for (let i = 0; i < ex.tests.length; i++) {
      const tc = ex.tests[i];
      const result = await executeCodeForTest(code, tc.input);
      const pass = result.success && result.value === tc.expected;
      if (!pass) allPass = false;
      html += `<div class="test-result ${pass ? 'pass' : 'fail'}" style="padding:8px; border-radius:4px; border:1px solid var(--border); text-align:center; font-size:12px; background:var(--bg-tertiary)">
        <div style="margin-bottom:4px">Case ${i+1}</div>
        <div style="font-size:16px">${pass ? '✅' : '❌'}</div>
      </div>`;
    }
    html += '</div>';
    
    const finalStatus = allPass 
      ? `<div style="margin-top:16px; padding:12px; background:rgba(16,185,129,0.1); border:1px solid var(--green); color:var(--green); border-radius:8px; font-weight:800; text-align:center">ACCEPTED 🎉</div>`
      : `<div style="margin-top:16px; padding:12px; background:rgba(239,68,68,0.1); border:1px solid var(--red); color:var(--red); border-radius:8px; font-weight:800; text-align:center">FAILED - CHECK LOGS ❌</div>`;
    
    outputEl.innerHTML = html + finalStatus;
    
    if (allPass) {
      showToast('Problem solved!', 'success');
      saveSubmission(ex.title, 'Accepted', '< 1');
      updateProgress('solved', p => p + 1);
    }
  };

  window.openCE = (idx) => {
    const ex = exercises[idx];
    switchView('playground');
    currentProblem = ex;
    setTimeout(() => {
      editor.setValue(window.ceEditors[idx].getValue() || ex.starter);
      showProblemPanel(ex);
    }, 200);
  };
}

function markTopicComplete(id) {
  const progress = getProgress();
  if (!progress.completedTopicIds) progress.completedTopicIds = [];
  if (!progress.completedTopicIds.includes(id)) {
    progress.completedTopicIds.push(id);
    saveProgress(progress);
    showToast('Topic marked complete! 🎉', 'success');
  }
  const item = document.querySelector(`.topic-item[data-id="${id}"]`);
  if (item) item.classList.add('completed');
  updateSidebarProgress();
  const btn = document.getElementById('mark-complete');
  btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Completed ✓';
}
