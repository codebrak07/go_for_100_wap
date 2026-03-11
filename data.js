// ====== GO FOR 100 - WAP EXAM PREP - Data Module ======
const TOPICS = [
  { id: 1, title: "Data Types & Variables", icon: "📦" },
  { id: 2, title: "let, const & typeof", icon: "🔤" },
  { id: 3, title: "Conditions", icon: "🔀" },
  { id: 4, title: "Loops", icon: "🔁" },
  { id: 5, title: "Functions", icon: "⚡" },
  { id: 6, title: "Parameters & Return", icon: "↩️" },
  { id: 7, title: "Arrays", icon: "📋" },
  { id: 8, title: "Objects", icon: "🧱" },
  { id: 9, title: "Array of Objects", icon: "📚" },
  { id: 10, title: "Destructuring", icon: "🎁" },
  { id: 11, title: "Spread & Rest", icon: "✨" },
  { id: 12, title: "Higher Order Functions", icon: "🎯" },
  { id: 13, title: "Array HOF", icon: "🔧" },
  { id: 14, title: "Async JavaScript", icon: "⏳" },
  { id: 15, title: "setTimeout / setInterval", icon: "⏰" },
  { id: 16, title: "Promises", icon: "🤝" },
  { id: 17, title: "Fetch API", icon: "🌐" },
  { id: 18, title: "JSON", icon: "📄" },
  { id: 19, title: "async/await", icon: "⚙️" },
  { id: 20, title: "try/catch", icon: "🛡️" },
  { id: 21, title: "Final Exam Simulator", icon: "📝" }
];

function getTopicConcept(id) {
  const concepts = {
    1: `<h3>Data Types in JavaScript</h3><p>JavaScript has <strong>8 data types</strong>. 7 are primitive, 1 is non-primitive.</p>
<h4>Primitive Types</h4><ul><li><code>string</code> – text: <code>"hello"</code></li><li><code>number</code> – numeric: <code>42, 3.14</code></li><li><code>boolean</code> – <code>true</code> or <code>false</code></li><li><code>undefined</code> – declared but not assigned</li><li><code>null</code> – intentional empty</li><li><code>bigint</code> – large integers</li><li><code>symbol</code> – unique identifiers</li></ul>
<h4>Non-Primitive</h4><ul><li><code>object</code> – collections (arrays, objects, functions)</li></ul>
<pre><code>let name = "John";     // string
let age = 25;          // number
let isStudent = true;  // boolean
let x;                 // undefined
let y = null;          // null</code></pre>
<h4>Dynamic Typing</h4><p>Variables can change type at runtime:</p><pre><code>let val = 42;      // number
val = "hello";     // now string</code></pre>`,

    2: `<h3>let, const & typeof</h3>
<h4>var vs let vs const</h4>
<pre><code>var x = 10;   // function-scoped, hoisted, can redeclare
let y = 20;   // block-scoped, no redeclare
const z = 30; // block-scoped, cannot reassign</code></pre>
<p><strong>Key Rules:</strong></p><ul><li><code>let</code> and <code>const</code> are block-scoped <code>{}</code></li><li><code>const</code> must be initialized at declaration</li><li><code>const</code> objects/arrays can be mutated</li></ul>
<pre><code>const arr = [1,2,3];
arr.push(4); // OK! Array is mutated, not reassigned
// arr = [5]; // ERROR! Cannot reassign</code></pre>
<h4>typeof Operator</h4><pre><code>typeof "hi"       // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (famous JS bug!)
typeof []         // "object"
typeof {}         // "object"
typeof function(){} // "function"</code></pre>`,

    3: `<h3>Conditional Statements</h3>
<h4>if / else if / else</h4><pre><code>let score = 85;
if (score >= 90) {
  console.log("A grade");
} else if (score >= 80) {
  console.log("B grade");
} else {
  console.log("C grade");
}</code></pre>
<h4>Ternary Operator</h4><pre><code>let result = score >= 50 ? "Pass" : "Fail";</code></pre>
<h4>Switch Statement</h4><pre><code>switch(day) {
  case "Mon": console.log("Monday"); break;
  case "Tue": console.log("Tuesday"); break;
  default: console.log("Other day");
}</code></pre>
<h4>Truthy & Falsy</h4><p>Falsy values: <code>false, 0, "", null, undefined, NaN</code></p>
<p>Everything else is truthy including <code>"0"</code>, <code>[]</code>, <code>{}</code></p>`,

    4: `<h3>Loops</h3>
<h4>for Loop</h4><pre><code>for (let i = 0; i < 5; i++) {
  console.log(i); // 0,1,2,3,4
}</code></pre>
<h4>while Loop</h4><pre><code>let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}</code></pre>
<h4>do...while</h4><pre><code>let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);</code></pre>
<h4>for...of (Arrays)</h4><pre><code>for (let val of [10,20,30]) {
  console.log(val);
}</code></pre>
<h4>for...in (Objects)</h4><pre><code>let obj = {a:1, b:2};
for (let key in obj) {
  console.log(key, obj[key]);
}</code></pre>
<h4>break & continue</h4><pre><code>for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // skip 3
  if (i === 7) break;    // stop at 7
  console.log(i);
}</code></pre>`,

    5: `<h3>Functions</h3>
<h4>Function Declaration</h4><pre><code>function greet(name) {
  return "Hello, " + name;
}
console.log(greet("Alice")); // Hello, Alice</code></pre>
<h4>Function Expression</h4><pre><code>const add = function(a, b) {
  return a + b;
};</code></pre>
<h4>Arrow Functions</h4><pre><code>const multiply = (a, b) => a * b;
const square = x => x * x;
const sayHi = () => console.log("Hi");</code></pre>
<h4>Hoisting</h4><p>Function declarations are hoisted; expressions are NOT.</p>
<pre><code>hello(); // Works!
function hello() { console.log("Hi"); }

// greet(); // ERROR! Not hoisted
const greet = () => console.log("Hey");</code></pre>`,

    6: `<h3>Parameters & Return</h3>
<h4>Default Parameters</h4><pre><code>function greet(name = "World") {
  return "Hello, " + name;
}
greet();       // "Hello, World"
greet("JS");   // "Hello, JS"</code></pre>
<h4>Multiple Returns</h4><pre><code>function check(n) {
  if (n > 0) return "positive";
  if (n < 0) return "negative";
  return "zero";
}</code></pre>
<h4>Returning Objects</h4><pre><code>function createUser(name, age) {
  return { name, age };
}
const user = createUser("Ana", 22);</code></pre>
<h4>Callback Functions</h4><pre><code>function process(x, callback) {
  return callback(x);
}
process(5, n => n * 2); // 10</code></pre>`,

    7: `<h3>Arrays</h3>
<h4>Creating Arrays</h4><pre><code>let arr = [1, 2, 3, 4, 5];
let mixed = [1, "two", true, null];</code></pre>
<h4>Common Methods</h4><pre><code>arr.push(6);        // add end
arr.pop();          // remove end
arr.unshift(0);     // add start
arr.shift();        // remove start
arr.splice(1,1);    // remove at index
arr.slice(1,3);     // extract [1,3)
arr.concat([7,8]);  // merge
arr.includes(3);    // true
arr.indexOf(3);     // index or -1
arr.reverse();      // reverse in-place
arr.join("-");       // "1-2-3-4-5"</code></pre>
<h4>Spread with Arrays</h4><pre><code>let copy = [...arr];
let merged = [...arr, ...arr2];</code></pre>`,

    8: `<h3>Objects</h3>
<h4>Creating Objects</h4><pre><code>let person = {
  name: "Alice",
  age: 25,
  greet() {
    return "Hi, I'm " + this.name;
  }
};</code></pre>
<h4>Accessing Properties</h4><pre><code>person.name;        // dot notation
person["age"];      // bracket notation</code></pre>
<h4>Object Methods</h4><pre><code>Object.keys(person);    // ["name","age","greet"]
Object.values(person);  // ["Alice", 25, fn]
Object.entries(person); // [["name","Alice"],...]
Object.assign({}, person); // clone</code></pre>
<h4>Optional Chaining</h4><pre><code>let city = person?.address?.city; // undefined (no error)</code></pre>`,

    9: `<h3>Array of Objects</h3><pre><code>const students = [
  { name: "Alice", grade: 90 },
  { name: "Bob", grade: 75 },
  { name: "Carol", grade: 88 }
];

// Find student
const found = students.find(s => s.name === "Bob");

// Filter by grade
const toppers = students.filter(s => s.grade >= 85);

// Get names only
const names = students.map(s => s.name);

// Sort by grade
students.sort((a,b) => b.grade - a.grade);

// Average grade
const avg = students.reduce((sum,s) => sum+s.grade, 0) / students.length;</code></pre>`,

    10: `<h3>Destructuring</h3>
<h4>Array Destructuring</h4><pre><code>const [a, b, c] = [1, 2, 3];
const [first, ...rest] = [10, 20, 30, 40];
// first = 10, rest = [20,30,40]

const [x, , z] = [1, 2, 3]; // skip element
// x=1, z=3</code></pre>
<h4>Object Destructuring</h4><pre><code>const {name, age} = {name:"Ana", age:22};

// Rename
const {name: n, age: a} = {name:"Ana", age:22};

// Default values
const {color = "red"} = {};

// Nested
const {address: {city}} = {address: {city: "NYC"}};</code></pre>
<h4>Function Parameter Destructuring</h4><pre><code>function greet({name, age}) {
  return name + " is " + age;
}
greet({name:"Ana", age:22});</code></pre>`,

    11: `<h3>Spread & Rest Operators</h3>
<h4>Spread (...) – Expands</h4><pre><code>// Arrays
const a = [1,2,3];
const b = [...a, 4, 5]; // [1,2,3,4,5]

// Objects
const obj = {x:1, y:2};
const clone = {...obj, z:3}; // {x:1,y:2,z:3}

// Function call
Math.max(...a); // 3</code></pre>
<h4>Rest (...) – Collects</h4><pre><code>function sum(...nums) {
  return nums.reduce((a,b) => a+b, 0);
}
sum(1,2,3,4); // 10

const [first, ...others] = [10,20,30];
// first=10, others=[20,30]</code></pre>`,

    12: `<h3>Higher Order Functions</h3>
<p>A HOF is a function that takes or returns another function.</p>
<pre><code>// Takes a function
function apply(fn, value) {
  return fn(value);
}
apply(x => x*2, 5); // 10

// Returns a function
function multiplier(factor) {
  return (num) => num * factor;
}
const double = multiplier(2);
double(5); // 10

// Closures
function counter() {
  let count = 0;
  return {
    inc: () => ++count,
    get: () => count
  };
}
const c = counter();
c.inc(); c.inc();
c.get(); // 2</code></pre>`,

    13: `<h3>Array Higher Order Functions</h3>
<h4>map – Transform</h4><pre><code>[1,2,3].map(x => x*2); // [2,4,6]</code></pre>
<h4>filter – Select</h4><pre><code>[1,2,3,4,5].filter(x => x>3); // [4,5]</code></pre>
<h4>reduce – Accumulate</h4><pre><code>[1,2,3,4].reduce((sum,x) => sum+x, 0); // 10</code></pre>
<h4>find / findIndex</h4><pre><code>[10,20,30].find(x => x>15); // 20
[10,20,30].findIndex(x => x>15); // 1</code></pre>
<h4>some / every</h4><pre><code>[1,2,3].some(x => x>2);  // true
[1,2,3].every(x => x>0); // true</code></pre>
<h4>forEach</h4><pre><code>[1,2,3].forEach(x => console.log(x));</code></pre>
<h4>Chaining</h4><pre><code>[1,2,3,4,5]
  .filter(x => x%2!==0)
  .map(x => x*x); // [1,9,25]</code></pre>`,

    14: `<h3>Async JavaScript</h3>
<p>JavaScript is <strong>single-threaded</strong> with an <strong>event loop</strong>.</p>
<h4>Call Stack</h4><p>Executes functions one at a time (LIFO).</p>
<h4>Web APIs</h4><p>Browser provides setTimeout, fetch, DOM events – these run asynchronously.</p>
<h4>Event Loop</h4><pre><code>console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Output: 1, 3, 2</code></pre>
<p>Even with 0ms delay, setTimeout callback goes to the task queue and waits for the call stack to empty.</p>
<h4>Microtasks vs Macrotasks</h4><p>Promises (microtasks) run before setTimeout (macrotasks).</p>
<pre><code>console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// Output: A, D, C, B</code></pre>`,

    15: `<h3>setTimeout & setInterval</h3>
<h4>setTimeout</h4><pre><code>setTimeout(() => {
  console.log("Runs after 2 seconds");
}, 2000);

// Cancel
const id = setTimeout(() => {}, 1000);
clearTimeout(id);</code></pre>
<h4>setInterval</h4><pre><code>let count = 0;
const id = setInterval(() => {
  count++;
  console.log(count);
  if (count >= 5) clearInterval(id);
}, 1000);</code></pre>
<h4>Common Pattern</h4><pre><code>function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
await delay(2000); // wait 2s</code></pre>`,

    16: `<h3>Promises</h3>
<h4>Creating a Promise</h4><pre><code>const p = new Promise((resolve, reject) => {
  let success = true;
  if (success) resolve("Done!");
  else reject("Error!");
});

p.then(val => console.log(val))
 .catch(err => console.log(err));</code></pre>
<h4>Chaining</h4><pre><code>fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));</code></pre>
<h4>Promise.all</h4><pre><code>Promise.all([p1, p2, p3])
  .then(results => console.log(results));</code></pre>
<h4>Promise.race</h4><pre><code>Promise.race([p1, p2])
  .then(first => console.log(first));</code></pre>`,

    17: `<h3>Fetch API</h3><pre><code>// GET request
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => res.json())
  .then(data => console.log(data));

// POST request
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    title: "Hello",
    body: "World",
    userId: 1
  })
})
.then(res => res.json())
.then(data => console.log(data));

// With async/await
async function getData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch(err) {
    console.error(err);
  }
}</code></pre>`,

    18: `<h3>JSON</h3>
<h4>JSON.stringify</h4><pre><code>const obj = {name:"Alice", age:25};
const json = JSON.stringify(obj);
// '{"name":"Alice","age":25}'

// Pretty print
JSON.stringify(obj, null, 2);</code></pre>
<h4>JSON.parse</h4><pre><code>const str = '{"name":"Alice","age":25}';
const parsed = JSON.parse(str);
console.log(parsed.name); // "Alice"</code></pre>
<h4>LocalStorage with JSON</h4><pre><code>// Save
localStorage.setItem("user", JSON.stringify(obj));

// Load
const user = JSON.parse(localStorage.getItem("user"));</code></pre>
<h4>JSON Rules</h4><ul><li>Keys must be double-quoted strings</li><li>No functions, undefined, or comments</li><li>No trailing commas</li></ul>`,

    19: `<h3>async / await</h3>
<h4>Basic Syntax</h4><pre><code>async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
fetchData().then(d => console.log(d));</code></pre>
<h4>Error Handling</h4><pre><code>async function safe() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch(err) {
    console.error("Failed:", err);
  }
}</code></pre>
<h4>Parallel Execution</h4><pre><code>async function both() {
  const [a, b] = await Promise.all([
    fetch(url1).then(r=>r.json()),
    fetch(url2).then(r=>r.json())
  ]);
}</code></pre>
<p><strong>Key:</strong> <code>await</code> can only be used inside <code>async</code> functions.</p>`,

    20: `<h3>try / catch / finally</h3><pre><code>try {
  let result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error("Error:", error.message);
} finally {
  console.log("Always runs");
}</code></pre>
<h4>Throwing Errors</h4><pre><code>function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

try {
  divide(10, 0);
} catch(e) {
  console.log(e.message); // "Cannot divide by zero"
}</code></pre>
<h4>Custom Error Types</h4><pre><code>class ValidationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ValidationError";
  }
}</code></pre>`,

    21: `<h3>Final Exam Simulator</h3><p>Test yourself with a full mock WAP mid-semester exam!</p>
<p>The exam includes:</p><ul><li>20 Multiple Choice Questions</li><li>10 Output Prediction Questions</li><li>13 Coding Problems</li></ul>
<p>Click the <strong>Exam</strong> tab in the navigation bar to start.</p>`
  };
  return concepts[id] || `<p>Content for topic ${id} coming soon.</p>`;
}

function getTopicNotes(id) {
  const notes = {
    1: ["Primitive: string, number, boolean, undefined, null, bigint, symbol", "Non-primitive: object (arrays, objects, functions)", "typeof null === 'object' (historical bug)", "NaN is type 'number'", "undefined vs null: undefined = not assigned, null = intentional empty"],
    2: ["var: function-scoped, hoisted, can redeclare", "let: block-scoped, no redeclare", "const: block-scoped, must initialize, can't reassign", "const objects/arrays CAN be mutated", "typeof returns a string"],
    3: ["if/else if/else for branching", "Ternary: condition ? a : b", "Switch needs break statements", "Falsy: false, 0, '', null, undefined, NaN", "== does type coercion, === does not"],
    4: ["for(init; condition; update)", "while checks before, do-while checks after", "for...of iterates values (arrays)", "for...in iterates keys (objects)", "break exits loop, continue skips iteration"],
    5: ["Declaration: function name() {}", "Expression: const fn = function() {}", "Arrow: const fn = () => {}", "Declarations are hoisted, expressions are NOT", "Arrow functions don't have their own 'this'"],
    6: ["Default params: function(x = 10)", "Rest params: function(...args)", "Return stops function execution", "Functions can return any type", "Callbacks = functions passed as arguments"],
    7: ["push/pop = end, shift/unshift = start", "splice modifies, slice copies", "includes, indexOf for searching", "Array.isArray() to check", "Arrays are objects (typeof [] = 'object')"],
    8: ["Dot notation: obj.key, Bracket: obj['key']", "Object.keys/values/entries", "delete obj.key removes property", "Shorthand: {name, age} if var names match", "Optional chaining: obj?.prop"],
    9: ["find returns first match, filter returns all", "map transforms each element", "sort with comparator for objects", "reduce to aggregate values", "Chaining: arr.filter().map().sort()"],
    10: ["Array: const [a,b] = [1,2]", "Object: const {name} = obj", "Rename: const {name: n} = obj", "Default: const {x = 5} = {}", "Nested: const {a: {b}} = obj"],
    11: ["Spread expands: [...arr], {...obj}", "Rest collects: function(...args)", "Spread = shallow copy only", "Rest must be last parameter", "Spread in function calls: fn(...arr)"],
    12: ["HOF takes or returns a function", "Closure: inner fn remembers outer scope", "IIFE: (function(){})()", "Currying: f(a)(b)(c)", "Compose: combine functions"],
    13: ["map: transform each element", "filter: select matching elements", "reduce: accumulate to single value", "find/findIndex: locate first match", "some/every: boolean checks on array"],
    14: ["JS is single-threaded", "Event loop handles async operations", "Call stack + task queue + microtask queue", "Microtasks (promises) before macrotasks (setTimeout)", "Web APIs handle async operations"],
    15: ["setTimeout(fn, ms) runs once", "setInterval(fn, ms) runs repeatedly", "clearTimeout/clearInterval to cancel", "0ms timeout still goes to task queue", "Common for debounce/throttle patterns"],
    16: ["new Promise((resolve, reject) => {})", "then for success, catch for error", "Promise.all waits for all", "Promise.race returns first settled", "Promise.allSettled returns all results"],
    17: ["fetch returns a Promise", "res.json() also returns Promise", "Always check res.ok for errors", "POST needs method, headers, body", "CORS may block cross-origin requests"],
    18: ["JSON.stringify converts to string", "JSON.parse converts to object", "Keys must be double-quoted", "No functions/undefined in JSON", "Used with localStorage for persistence"],
    19: ["async function returns Promise", "await pauses until Promise resolves", "Must be inside async function", "Use try/catch for error handling", "Promise.all for parallel await"],
    20: ["try block contains risky code", "catch receives the error object", "finally ALWAYS executes", "throw new Error('msg') to throw", "Custom errors extend Error class"],
  };
  return notes[id] || ["Notes coming soon."];
}

function getTopicMCQs(id) {
  const mcqs = {
    1: [
      { q: "What is typeof null?", opts: ["\"null\"", "\"object\"", "\"undefined\"", "\"boolean\""], ans: 1 },
      { q: "Which is NOT a primitive type?", opts: ["string", "boolean", "array", "symbol"], ans: 2 },
      { q: "What is typeof NaN?", opts: ["\"NaN\"", "\"undefined\"", "\"number\"", "\"null\""], ans: 2 }
    ],
    2: [
      { q: "Which keyword allows reassignment?", opts: ["const", "let", "Both", "Neither"], ans: 1 },
      { q: "What happens with const x; ?", opts: ["x is undefined", "SyntaxError", "x is null", "ReferenceError"], ans: 1 },
      { q: "let is ___-scoped", opts: ["function", "block", "global", "module"], ans: 1 }
    ],
    3: [
      { q: "What does 0 == false return?", opts: ["true", "false", "undefined", "Error"], ans: 0 },
      { q: "What does 0 === false return?", opts: ["true", "false", "undefined", "Error"], ans: 1 },
      { q: "Which is falsy?", opts: ["\"false\"", "1", "\" \"", "\"\""], ans: 3 }
    ],
    4: [
      { q: "for...of iterates over?", opts: ["keys", "values", "indices", "properties"], ans: 1 },
      { q: "for...in iterates over?", opts: ["values", "keys", "indices", "entries"], ans: 1 },
      { q: "Which loop runs at least once?", opts: ["for", "while", "do...while", "for...of"], ans: 2 }
    ],
    5: [
      { q: "Arrow functions have their own 'this'?", opts: ["Yes", "No", "Only in strict", "Depends"], ans: 1 },
      { q: "Which is hoisted?", opts: ["const fn = ()=>{}", "function fn(){}", "let fn = function(){}", "All of them"], ans: 1 },
      { q: "Arrow syntax for one param?", opts: ["(x) => x", "x => x", "Both work", "Neither"], ans: 2 }
    ],
    6: [
      { q: "Which is used to collect multiple arguments into an array?", opts: ["arguments", "...rest", "collect()", "spread"], ans: 1 },
      { q: "What happens if you call a function with fewer arguments than parameters?", opts: ["ReferenceError", "Extra parameters become undefined", "Function skips call", "TypeError"], ans: 1 },
      { q: "What does a function return if no return statement is present?", opts: ["null", "0", "undefined", "NaN"], ans: 2 }
    ],
    7: [
      { q: "Which method adds an element to the beginning of an array?", opts: ["push", "pop", "shift", "unshift"], ans: 3 },
      { q: "What is the result of typeof [1, 2]?", opts: ["\"array\"", "\"object\"", "\"list\"", "\"collection\""], ans: 1 },
      { q: "Which method creates a shallow copy of a portion of an array?", opts: ["splice", "slice", "split", "shift"], ans: 1 }
    ],
    8: [
      { q: "How do you access a property with a key stored in a variable 'k'?", opts: ["obj.k", "obj[k]", "obj->k", "obj.get(k)"], ans: 1 },
      { q: "Which method returns an array of all keys in an object?", opts: ["Object.values()", "Object.keys()", "Object.entries()", "Object.get()"], ans: 1 },
      { q: "How do you permanently remove a property from an object?", opts: ["obj.prop = null", "delete obj.prop", "remove obj.prop", "obj.prop = undefined"], ans: 1 }
    ],
    9: [
      { q: "Which method is best for finding a specific object in an array by a property value?", opts: ["map", "filter", "find", "some"], ans: 2 },
      { q: "What does the .filter() method return?", opts: ["The first match", "A new array with all matches", "A boolean", "The index of match"], ans: 1 },
      { q: "How do you accurately sort an array of objects by a numeric property?", opts: ["arr.sort()", "arr.sort((a,b) => a.val - b.val)", "arr.sortBy('val')", "arr.val.sort()"], ans: 1 }
    ],
    10: [
      { q: "const { a: b } = { a: 5 }; What is the value of 'b'?", opts: ["undefined", "5", "a", "ReferenceError"], ans: 1 },
      { q: "const [x, , y] = [1, 2, 3]; What is the value of 'y'?", opts: ["2", "3", "undefined", "1"], ans: 1 },
      { q: "How do you set a default value in destructuring?", opts: ["const {x == 5} = obj", "const {x = 5} = obj", "const {x ? 5} = obj", "const {x : 5} = obj"], ans: 1 }
    ],
    11: [
      { q: "What does the spread operator (...) do with an array?", opts: ["Collates elements into a new array", "Expands an array into individual elements", "Converts an array to a string", "Deletes array elements"], ans: 1 },
      { q: "Where must the rest parameter be placed in a function?", opts: ["At the beginning", "In the middle", "As the last parameter", "Anywhere"], ans: 2 },
      { q: "What is the result of [...'abc']?", opts: ["['abc']", "['a', 'b', 'c']", "Error", "undefined"], ans: 1 }
    ],
    12: [
      { q: "What defines a Higher Order Function?", opts: ["It is a constructor function", "It takes or returns another function", "It has high performance", "It is defined globally"], ans: 1 },
      { q: "What is a closure in JavaScript?", opts: ["A function that cannot be modified", "A function that remembers its outer lexical environment", "A way to close browser windows", "A type of private property"], ans: 1 },
      { q: "What is the purpose of an IIFE?", opts: ["Integrated Interface for Functions", "Immediately Invoked Function Expression", "Internal Inline Function Entity", "Instant Execution of All Functions"], ans: 1 }
    ],
    13: [
      { q: "Which method transforms every element in an array into a new one?", opts: ["filter", "forEach", "map", "some"], ans: 2 },
      { q: "The .reduce() method takes which two primary arguments?", opts: ["array and index", "callback and initialValue", "filter and sort", "value and key"], ans: 1 },
      { q: "Which method checks if at least one element passes a condition?", opts: ["every", "some", "only", "all"], ans: 1 }
    ],
    14: [
      { q: "JavaScript is inherently...", opts: ["Multi-threaded", "Single-threaded", "Compiled statically", "Parallel"], ans: 1 },
      { q: "Where does async code go once ready to execute?", opts: ["Call Stack", "Task Queue (or Callback Queue)", "Memory Heap", "Browser Cache"], ans: 1 },
      { q: "In the event loop, which tasks have higher priority?", opts: ["Macrotasks (setTimeout)", "Microtasks (Promises)", "UI Rendering", "Mouse events"], ans: 1 }
    ],
    15: [
      { q: "setTimeout(fn, 0) schedules execution...", opts: ["Immediately", "After current sync code finishes", "Before current code", "After 1 second"], ans: 1 },
      { q: "How do you stop a repeating setInterval?", opts: ["stopInterval()", "clearInterval(id)", "interval.stop()", "delete interval"], ans: 1 },
      { q: "What does the setTimeout function return?", opts: ["The function's result", "A unique ID (timeoutId)", "A Promise", "true"], ans: 1 }
    ],
    16: [
      { q: "A Promise has how many possible states?", opts: ["2", "3 (pending, fulfilled, rejected)", "4", "Infinite"], ans: 1 },
      { q: "Promise.all() will reject if...", opts: ["Any promise in the array rejects", "All promises reject", "None reject", "Only the first one rejects"], ans: 0 },
      { q: "Which method is used for error handling in Promises?", opts: [".then()", ".catch()", ".finally()", ".error()"], ans: 1 }
    ],
    17: [
      { q: "The fetch() API returns a...", opts: ["JSON object", "Response string", "Promise", "Callback"], ans: 2 },
      { q: "Does fetch() automatically reject on 404/500 HTTP errors?", opts: ["Yes", "No (it resolves unless network fails)", "Only on 500", "Depends on headers"], ans: 1 },
      { q: "How do you extract JSON body from a fetch response?", opts: ["res.data", "res.json()", "JSON.parse(res)", "res.body"], ans: 1 }
    ],
    18: [
      { q: "Which method converts a JavaScript object into a JSON string?", opts: ["JSON.parse()", "JSON.stringify()", "JSON.to()", "Object.json()"], ans: 1 },
      { q: "In valid JSON, keys must be surrounded by...", opts: ["Single quotes", "Double quotes", "No quotes", "Backticks"], ans: 1 },
      { q: "Which of these cannot be directly stored in JSON format?", opts: ["string", "number", "function", "boolean"], ans: 2 }
    ],
    19: [
      { q: "The 'await' keyword can only be used inside...", opts: ["Global scope", "An async function", "A constructor", "A loop"], ans: 1 },
      { q: "An async function consistently returns a...", opts: ["Resolved value", "JSON object", "Promise", "Callback"], ans: 2 },
      { q: "What is the best way to handle errors with async/await?", opts: [".catch() chaining", "if/else checks", "try/catch blocks", "throw statements"], ans: 2 }
    ],
    20: [
      { q: "When does the 'finally' block in a try/catch execute?", opts: ["Only on success", "Only on error", "Always", "Never"], ans: 2 },
      { q: "Which keyword is used to manually trigger an exception?", opts: ["error", "throw", "raise", "reject"], ans: 1 },
      { q: "A try block can be used without catch if...", opts: ["It is inside a loop", "It is followed by a finally block", "It is an async function", "Strict mode is enabled"], ans: 1 }
    ]
  };
  return mcqs[id] || [
    { q: "Default Topic Question", opts: ["A", "B", "C", "D"], ans: 0 }
  ];
}

function getTopicOutputQs(id) {
  const oqs = {
    1: [
      { code: 'console.log(typeof NaN);', answer: "number" },
      { code: 'console.log(typeof null);', answer: "object" }
    ],
    2: [
      { code: 'let x = 1;\n{\n  let x = 2;\n}\nconsole.log(x);', answer: "1" },
      { code: 'const arr = [1];\narr.push(2);\nconsole.log(arr.length);', answer: "2" }
    ],
    3: [
      { code: 'console.log(false == "0");', answer: "true" },
      { code: 'console.log(false === "0");', answer: "false" }
    ],
    4: [
      { code: 'let res = "";\nfor(var i=0; i<3; i++) {}\nconsole.log(i);', answer: "3" },
      { code: 'let res = "";\nfor(let i=0; i<3; i++) {}\nconsole.log(typeof i);', answer: "undefined" }
    ],
    5: [
      { code: 'console.log(typeof (x => x));', answer: "function" },
      { code: 'let x = 5;\nconst f = () => x;\nx = 10;\nconsole.log(f());', answer: "10" }
    ],
    6: [
      { code: 'function f(a, b = 2) { return a + b; }\nconsole.log(f(5));', answer: "7" },
      { code: 'function g(...x) { return x.length; }\nconsole.log(g(1,2,3));', answer: "3" }
    ],
    7: [
      { code: 'console.log([1,2,3].push(4));', answer: "4" },
      { code: 'console.log(Array.isArray({}));', answer: "false" }
    ],
    8: [
      { code: 'const a = { x: 1 };\nconst b = a;\nb.x = 2;\nconsole.log(a.x);', answer: "2" },
      { code: 'const x = "name";\nconst obj = { name: "JS" };\nconsole.log(obj[x]);', answer: "JS" }
    ],
    9: [
      { code: 'const users = [{id:1}, {id:2}];\nconsole.log(users.find(u => u.id === 1).id);', answer: "1" },
      { code: 'const items = [{v:10}, {v:20}];\nconsole.log(items.filter(i => i.v > 15).length);', answer: "1" }
    ],
    10: [
      { code: 'const { a: b } = { a: 10 };\nconsole.log(b);', answer: "10" },
      { code: 'const [,,x] = [1,2,3];\nconsole.log(x);', answer: "3" }
    ],
    11: [
      { code: 'const a = [1, 2];\nconst b = [...a, 3];\nconsole.log(b.length);', answer: "3" },
      { code: 'const obj = { a: 1, b: 2 };\nconst { a, ...rest } = obj;\nconsole.log(rest.b);', answer: "2" }
    ],
    12: [
      { code: 'function outer() {\n  let x = 1;\n  return () => x++;\n}\nconst f = outer();\nf();\nconsole.log(f());', answer: "2" },
      { code: 'console.log((x => x * x)(3));', answer: "9" }
    ],
    13: [
      { code: 'console.log([1,2,3].map(x => x * 2)[1]);', answer: "4" },
      { code: 'console.log([1,2,3].reduce((a, b) => a + b, 0));', answer: "6" }
    ],
    14: [
      { code: 'console.log("start");\nsetTimeout(() => console.log("timeout"), 0);\nconsole.log("end");', answer: "start\nend\ntimeout" },
      { code: 'Promise.resolve().then(() => console.log("promise"));\nconsole.log("sync");', answer: "sync\npromise" }
    ],
    15: [
      { code: 'let x = 0;\nsetTimeout(() => x = 1, 0);\nconsole.log(x);', answer: "0" },
      { code: 'const id = setTimeout(() => {}, 1000);\nconsole.log(typeof id);', answer: "number" }
    ],
    16: [
      { code: 'Promise.resolve(5).then(x => x * 2).then(console.log);', answer: "10" },
      { code: 'Promise.reject("err").catch(e => "fixed").then(console.log);', answer: "fixed" }
    ],
    17: [
      { code: 'console.log(typeof fetch("url"));', answer: "object" },
      { code: '// fetch simulation\nPromise.resolve({ok: true}).then(r => console.log(r.ok));', answer: "true" }
    ],
    18: [
      { code: 'console.log(JSON.stringify({ a: undefined, b: 2 }));', answer: '{"b":2}' },
      { code: 'console.log(JSON.parse(\'{"a":1}\').a);', answer: "1" }
    ],
    19: [
      { code: 'async function f() { return 1; }\nconsole.log(f() instanceof Promise);', answer: "true" },
      { code: 'async function g() { return await Promise.resolve(5); }\ng().then(console.log);', answer: "5" }
    ],
    20: [
      { code: 'try {\n  throw 1;\n} catch (e) {\n  console.log(e);\n} finally {\n  console.log(2);\n}', answer: "1\n2" },
      { code: 'function f() {\n  try { return 1; } finally { console.log(2); }\n}\nf();', answer: "2" }
    ]
  };
  if (oqs[id]) return oqs[id];
  return [{ code: 'console.log("Practice");', answer: "Practice" }];
}

function getTopicCodingExercises(id) {
  const exercises = {
    1: [
      { title: "Identify Primitive", difficulty: "easy", desc: "Write <code>isPrimitive(val)</code>. Return true if value is a string, number, or boolean.", starter: "function isPrimitive(val) {\n  // Code here\n}", tests: [{ input: "isPrimitive('hi')", expected: "true" }, { input: "isPrimitive(10)", expected: "true" }] },
      { code: "function check(x){ return typeof x; }", title: "Type Checker", difficulty: "easy", desc: "Return the string 'object' if null is passed, otherwise standard typeof.", starter: "function typeCheck(v) {\n  return typeof v;\n}", tests: [{ input: "typeCheck(null)", expected: "object" }] },
      { title: "Safe Addition", difficulty: "medium", desc: "<code>add(a, b)</code>. If either is NaN, return 'Invalid'. Else return sum.", starter: "function add(a, b) {\n  // Handle NaN\n}", tests: [{ input: "add(5, 5)", expected: "10" }, { input: "add(5, NaN)", expected: "Invalid" }] },
      { title: "Truthy Counter", difficulty: "medium", desc: "Count truthy values in an array.", starter: "function countTruthy(arr) {\n  // Code here\n}", tests: [{ input: "countTruthy([0, 1, '', 'hi'])", expected: "2" }] },
      { title: "Null to Zero", difficulty: "medium", desc: "Replace null with 0 in an array.", starter: "function filterNull(arr) {\n  // Code here\n}", tests: [{ input: "JSON.stringify(filterNull([1, null, 3]))", expected: "[1,0,3]" }] }
    ],
    2: [
      { title: "Block Scope Test", difficulty: "easy", desc: "Return the inner shadowed value of <code>x</code>.", starter: "function scope() {\n  let x = 1;\n  { let x = 2; return x; }\n}", tests: [{ input: "scope()", expected: "2" }] },
      { title: "Const Guard", difficulty: "easy", desc: "Try to update a property of a const object. Return the updated object.", starter: "function updateObj() {\n  const obj = { v: 1 };\n  obj.v = 2;\n  return obj.v;\n}", tests: [{ input: "updateObj()", expected: "2" }] },
      { title: "Variable Swapper", difficulty: "medium", desc: "Swap two variables using a temp variable.", starter: "function swap(a, b) {\n  // Return [b, a]\n}", tests: [{ input: "JSON.stringify(swap(1, 2))", expected: "[2,1]" }] },
      { title: "Global Pollution", difficulty: "medium", desc: "Prevent global variable usage by using locally scoped <code>let</code>.", starter: "function local() {\n  let y = 100;\n  return y;\n}", tests: [{ input: "local()", expected: "100" }] },
      { title: "Hoisting Prediction", difficulty: "medium", desc: "Demonstrate that function declarations are hoisted.", starter: "function hoist() {\n  return f();\n  function f() { return 'ok'; }\n}", tests: [{ input: "hoist()", expected: "ok" }] }
    ],
    3: [
      { title: "Even or Odd", difficulty: "easy", desc: "Return 'Even' if number is even, else 'Odd'.", starter: "function check(n) {\n  // Code here\n}", tests: [{ input: "check(2)", expected: "Even" }, { input: "check(3)", expected: "Odd" }] },
      { title: "Grade Calc", difficulty: "easy", desc: ">=90: 'A', >=80: 'B', else 'C'.", starter: "function grade(s) {\n  // Code here\n}", tests: [{ input: "grade(95)", expected: "A" }, { input: "grade(85)", expected: "B" }] },
      { title: "Leap Year", difficulty: "medium", desc: "Check if year is leap year (divisible by 4 and not 100, or by 400).", starter: "function isLeap(y) {\n  // Code here\n}", tests: [{ input: "isLeap(2000)", expected: "true" }, { input: "isLeap(2021)", expected: "false" }] },
      { title: "FizzBuzz Logic", difficulty: "medium", desc: "If div by 3 'Fizz', by 5 'Buzz', both 'FizzBuzz'.", starter: "function fb(n) {\n  // Code here\n}", tests: [{ input: "fb(15)", expected: "FizzBuzz" }, { input: "fb(3)", expected: "Fizz" }] },
      { title: "Weekday Name", difficulty: "medium", desc: "1-sun, 2-mon... using switch.", starter: "function day(n) {\n  // Code here\n}", tests: [{ input: "day(1)", expected: "sun" }] }
    ],
    4: [
      { title: "Sum 1 to N", difficulty: "easy", desc: "Calculate sum of 1 to n using for loop.", starter: "function sum(n) {\n  // Code here\n}", tests: [{ input: "sum(5)", expected: "15" }] },
      { title: "String Repeater", difficulty: "easy", desc: "Repeat string <code>s</code>, <code>n</code> times.", starter: "function rep(s, n) {\n  // Code here\n}", tests: [{ input: "rep('A', 3)", expected: "AAA" }] },
      { title: "Find Max", difficulty: "medium", desc: "Return highest number in array using loop.", starter: "function findMax(arr) {\n  // Code here\n}", tests: [{ input: "findMax([1,5,3])", expected: "5" }] },
      { title: "Reverse String", difficulty: "medium", desc: "Reverse string using for loop.", starter: "function rev(s) {\n  // Code here\n}", tests: [{ input: "rev('abc')", expected: "cba" }] },
      { title: "Count Vowels", difficulty: "medium", desc: "Count vowels in string.", starter: "function countV(s) {\n  // Code here\n}", tests: [{ input: "countV('hello')", expected: "2" }] }
    ],
    5: [
      { title: "Simple Square", difficulty: "easy", desc: "Arrow function to square a number.", starter: "const sq = n => {\n  // Code here\n}", tests: [{ input: "sq(4)", expected: "16" }] },
      { title: "Full Name", difficulty: "easy", desc: "Function that takes first and last and returns full name.", starter: "function name(f, l) {\n  // Code here\n}", tests: [{ input: "name('Joe', 'Doe')", expected: "Joe Doe" }] },
      { title: "Multi-parameter Addition", difficulty: "medium", desc: "Return sum of 3 numbers.", starter: "function add3(a, b, c) {\n  // Code here\n}", tests: [{ input: "add3(1,2,3)", expected: "6" }] },
      { title: "Is Arrow?", difficulty: "medium", desc: "Check if a string representation contains '=>'.", starter: "function isArrow(s) {\n  // Code here\n}", tests: [{ input: "isArrow('()=>{}')", expected: "true" }] },
      { title: "Self-Invoking", difficulty: "medium", desc: "Return 'run' from an IIFE.", starter: "function runIIFE() {\n  return (() => 'run')();\n}", tests: [{ input: "runIIFE()", expected: "run" }] }
    ],
    6: [
      { title: "Default Greeting", difficulty: "easy", desc: "Greet user with default 'Guest' if no name is provided.", starter: "function greet(n = 'Guest') {\n  return 'Hello ' + n;\n}", tests: [{ input: "greet()", expected: "Hello Guest" }, { input: "greet('Ali')", expected: "Hello Ali" }] },
      { title: "Sum All Args", difficulty: "easy", desc: "Sum all passed arguments using rest parameters.", starter: "function sum(...args) {\n  // Code here\n}", tests: [{ input: "sum(1,2,3)", expected: "6" }] },
      { title: "Arg multiplier", difficulty: "medium", desc: "Multiply first argument by the rest.", starter: "function mult(m, ...ns) {\n  // Code here\n}", tests: [{ input: "mult(2, 1, 2, 3)", expected: "12" }] },
      { title: "Validator", difficulty: "medium", desc: "Return true if all arguments are numbers.", starter: "function isNum(...args) {\n  // Code here\n}", tests: [{ input: "isNum(1, '2')", expected: "false" }, { input: "isNum(1, 2)", expected: "true" }] },
      { title: "Last Arg", difficulty: "medium", desc: "Return the last argument passed.", starter: "function last(...args) {\n  // Code here\n}", tests: [{ input: "last(1, 2, 9)", expected: "9" }] }
    ],
    7: [
      { title: "Add to End", difficulty: "easy", desc: "Add 'JS' to the end of array.", starter: "function addEnd(arr) {\n  // Code here\n}", tests: [{ input: "JSON.stringify(addEnd([1]))", expected: "[1,'JS']" }] },
      { title: "Remove Last", difficulty: "easy", desc: "Remove and return the last element.", starter: "function remLast(arr) {\n  return arr.pop();\n}", tests: [{ input: "remLast([1,2,3])", expected: "3" }] },
      { title: "Array Merger", difficulty: "medium", desc: "Merge two arrays without duplicates.", starter: "function merge(a, b) {\n  // Code here\n}", tests: [{ input: "JSON.stringify(merge([1],[1,2]))", expected: "[1,2]" }] },
      { title: "Subarray", difficulty: "medium", desc: "Return first 2 elements using slice.", starter: "function sub(arr) {\n  // Code here\n}", tests: [{ input: "JSON.stringify(sub([1,2,3,4]))", expected: "[1,2]" }] },
      { title: "In-place Reverser", difficulty: "medium", desc: "Reverse array in place.", starter: "function rev(arr) {\n  return arr.reverse();\n}", tests: [{ input: "JSON.stringify(rev([1,2,3]))", expected: "[3,2,1]" }] }
    ],
    8: [
      { title: "Prop Checker", difficulty: "easy", desc: "Return true if key exists in object.", starter: "function has(obj, k) {\n  return k in obj;\n}", tests: [{ input: "has({a:1}, 'a')", expected: "true" }] },
      { title: "Key List", difficulty: "easy", desc: "Return all keys as array.", starter: "function keys(obj) {\n  return Object.keys(obj);\n}", tests: [{ input: "JSON.stringify(keys({a:1,b:2}))", expected: "['a','b']" }] },
      { title: "Object Cloner", difficulty: "medium", desc: "Return a shallow copy.", starter: "function clone(obj) {\n  return {...obj};\n}", tests: [{ input: "JSON.stringify(clone({a:1}))", expected: '{"a":1}' }] },
      { title: "Safe Delete", difficulty: "medium", desc: "Delete key and return object.", starter: "function rem(obj, k) {\n  delete obj[k]; return obj;\n}", tests: [{ input: "JSON.stringify(rem({a:1,b:2}, 'a'))", expected: '{"b":2}' }] },
      { title: "Prop Getter", difficulty: "medium", desc: "Return value of key 'k' using brackets.", starter: "function get(obj, k) {\n  return obj[k];\n}", tests: [{ input: "get({val:99}, 'val')", expected: "99" }] }
    ],
    9: [
      { title: "Find by ID", difficulty: "easy", desc: "Find object with id 'i'.", starter: "function find(arr, i) {\n  // Code here\n}", tests: [{ input: "find([{id:1},{id:2}], 2).id", expected: "2" }] },
      { title: "Filter Active", difficulty: "easy", desc: "Filter objects where active is true.", starter: "function active(arr) {\n  // Code here\n}", tests: [{ input: "active([{a:true},{a:false}]).length", expected: "1" }] },
      { title: "Collect Names", difficulty: "medium", desc: "Return array of 'name' properties.", starter: "function names(arr) {\n  // Code here\n}", tests: [{ input: "JSON.stringify(names([{name:'A'},{name:'B'}]))", expected: "['A','B']" }] },
      { title: "Total Age", difficulty: "medium", desc: "Sum 'age' properties.", starter: "function sumAge(arr) {\n  // Code here\n}", tests: [{ input: "sumAge([{age:10},{age:20}])", expected: "30" }] },
      { title: "Index Finder", difficulty: "medium", desc: "Find index of object with name 'Target'.", starter: "function idx(arr) {\n  // Code here\n}", tests: [{ input: "idx([{name:'A'},{name:'Target'}])", expected: "1" }] }
    ],
    10: [
      { title: "Simple Extract", difficulty: "easy", desc: "Extract property 'x' from object.", starter: "function getX({x}) {\n  return x;\n}", tests: [{ input: "getX({x:5})", expected: "5" }] },
      { title: "Array Destruct", difficulty: "easy", desc: "Extract first element.", starter: "function first([x]) {\n  return x;\n}", tests: [{ input: "first([9,8])", expected: "9" }] },
      { title: "Rename Alias", difficulty: "medium", desc: "Extract 'a' and return it as 'b'.", starter: "function rename({a:b}) {\n  return b;\n}", tests: [{ input: "rename({a:77})", expected: "77" }] },
      { title: "Default Value", difficulty: "medium", desc: "Extract 'z' with default 0 if missing.", starter: "function def({z = 0}) {\n  return z;\n}", tests: [{ input: "def({})", expected: "0" }] },
      { title: "Skip Elements", difficulty: "medium", desc: "Extract second element.", starter: "function second([,x]) {\n  return x;\n}", tests: [{ input: "second([1,2,3])", expected: "2" }] }
    ],
    11: [
      { title: "Spread Array", difficulty: "easy", desc: "Create new array spreading <code>a</code> and <code>b</code>.", starter: "function combine(a, b) {\n  return [...a, ...b];\n}", tests: [{ input: "JSON.stringify(combine([1],[2]))", expected: "[1,2]" }] },
      { title: "Spread Object", difficulty: "easy", desc: "Merge two objects using spread.", starter: "function merge(o1, o2) {\n  return {...o1, ...o2};\n}", tests: [{ input: "JSON.stringify(merge({a:1},{b:2}))", expected: '{"a":1,"b":2}' }] },
      { title: "Max in Array", difficulty: "medium", desc: "Find max using <code>Math.max</code> and spread.", starter: "function maxVal(arr) {\n  return Math.max(...arr);\n}", tests: [{ input: "maxVal([1,9,2])", expected: "9" }] },
      { title: "Rest Collector", difficulty: "medium", desc: "Collect arguments into array.", starter: "function collect(...args) {\n  return args;\n}", tests: [{ input: "JSON.stringify(collect(1,2))", expected: "[1,2]" }] },
      { title: "Shallow Copy", difficulty: "medium", desc: "Return shallow copy of array using spread.", starter: "function copy(arr) {\n  return [...arr];\n}", tests: [{ input: "JSON.stringify(copy([1,2]))", expected: "[1,2]" }] }
    ],
    12: [
      { title: "Call Function", difficulty: "easy", desc: "Call passed function <code>fn</code>.", starter: "function call(fn) {\n  return fn();\n}", tests: [{ input: "call(() => 'hi')", expected: "hi" }] },
      { title: "Is Function?", difficulty: "easy", desc: "Check if argument is a function.", starter: "function isFn(val) {\n  return typeof val === 'function';\n}", tests: [{ input: "isFn(() => {})", expected: "true" }] },
      { title: "Repeat Run", difficulty: "medium", desc: "Run <code>fn</code>, <code>n</code> times.", starter: "function run(fn, n) {\n  for(let i=0; i<n; i++) fn();\n}", tests: [{ input: "let x=0; run(()=>x++, 3); x", expected: "3" }] },
      { title: "Basic Closure", difficulty: "medium", desc: "Return function that returns <code>v</code>.", starter: "function close(v) {\n  return () => v;\n}", tests: [{ input: "close(99)()", expected: "99" }] },
      { title: "Multiplier Gen", difficulty: "medium", desc: "Return function that multiplies by <code>m</code>.", starter: "function mult(m) {\n  return n => n * m;\n}", tests: [{ input: "mult(2)(5)", expected: "10" }] }
    ],
    13: [
      { title: "Double All", difficulty: "easy", desc: "Use map to double numbers.", starter: "function double(arr) {\n  return arr.map(x => x * 2);\n}", tests: [{ input: "JSON.stringify(double([1,2]))", expected: "[2,4]" }] },
      { title: "Filter Even", difficulty: "easy", desc: "Use filter for even numbers.", starter: "function evens(arr) {\n  return arr.filter(x => x % 2 === 0);\n}", tests: [{ input: "JSON.stringify(evens([1,2,3,4]))", expected: "[2,4]" }] },
      { title: "Array Sum", difficulty: "medium", desc: "Use reduce to sum numbers.", starter: "function sum(arr) {\n  return arr.reduce((a, b) => a + b, 0);\n}", tests: [{ input: "sum([10,20])", expected: "30" }] },
      { title: "Check All Positive", difficulty: "medium", desc: "Use every to check all > 0.", starter: "function allPos(arr) {\n  return arr.every(x => x > 0);\n}", tests: [{ input: "allPos([1,-1])", expected: "false" }] },
      { title: "Has String", difficulty: "medium", desc: "Use some to check for strings.", starter: "function hasStr(arr) {\n  return arr.some(x => typeof x === 'string');\n}", tests: [{ input: "hasStr([1, 'a'])", expected: "true" }] }
    ],
    14: [
      { title: "Sync Sequence", difficulty: "easy", desc: "Return string 'AB'.", starter: "function seq() {\n  return 'A' + 'B';\n}", tests: [{ input: "seq()", expected: "AB" }] },
      { title: "Simple Promise", difficulty: "easy", desc: "Return a resolved Promise with 'ok'.", starter: "function ok() {\n  return Promise.resolve('ok');\n}", tests: [{ input: "ok().then(v => v)", expected: "ok" }] },
      { title: "Async Wrapper", difficulty: "medium", desc: "Wrap <code>fn</code> result in Promise.", starter: "async function wrap(fn) {\n  return fn();\n}", tests: [{ input: "wrap(()=>5).then(v=>v)", expected: "5" }] },
      { title: "Wait and Resolve", difficulty: "medium", desc: "Return promise that resolves in 10ms.", starter: "function wait() {\n  return new Promise(r => setTimeout(() => r('done'), 10));\n}", tests: [{ input: "wait().then(v=>v)", expected: "done" }] },
      { title: "Rejector", difficulty: "medium", desc: "Return rejected promise.", starter: "function fail() {\n  return Promise.reject('error');\n}", tests: [{ input: "fail().catch(v=>v)", expected: "error" }] }
    ],
    15: [
      { title: "One Sec Delay", difficulty: "easy", desc: "Run <code>fn</code> after 10ms.", starter: "function delay(fn) {\n  setTimeout(fn, 10);\n}", tests: [{ input: "let x=0; delay(()=>x=1); setTimeout(()=>console.log(x), 20);", expected: "1" }] },
      { title: "Counter Stop", difficulty: "easy", desc: "Clear interval after one run.", starter: "function stop(id) {\n  clearInterval(id);\n}", tests: [{ input: "typeof stop", expected: "function" }] },
      { title: "Repeat 3 Times", difficulty: "medium", desc: "Run <code>fn</code> every 5ms, stop after 3 times.", starter: "function run3(fn) {\n  let c = 0;\n  const id = setInterval(() => {\n    fn();\n    if(++c === 3) clearInterval(id);\n  }, 5);\n}", tests: [{ input: "let count=0; run3(()=>count++); setTimeout(()=>console.log(count), 50);", expected: "3" }] },
      { title: "Debounce Check", difficulty: "medium", desc: "Return true.", starter: "function check() { return true; }", tests: [{ input: "check()", expected: "true" }] },
      { title: "Clear Timeout", difficulty: "medium", desc: "Function that cancels a timeout.", starter: "function cancel(id) {\n  clearTimeout(id);\n}", tests: [{ input: "typeof cancel", expected: "function" }] }
    ],
    16: [
      { title: "Resolved Value", difficulty: "easy", desc: "Return a resolved promise with value 42.", starter: "function get42() {\n  return Promise.resolve(42);\n}", tests: [{ input: "get42().then(v=>v)", expected: "42" }] },
      { title: "Catch Error", difficulty: "easy", desc: "Catch error from <code>p</code> and return 'caught'.", starter: "function handle(p) {\n  return p.catch(() => 'caught');\n}", tests: [{ input: "handle(Promise.reject()).then(v=>v)", expected: "caught" }] },
      { title: "Promise All Two", difficulty: "medium", desc: "Join results of two promises as string.", starter: "function join(p1, p2) {\n  return Promise.all([p1, p2]).then(arr => arr.join(''));\n}", tests: [{ input: "join(Promise.resolve('A'), Promise.resolve('B')).then(v=>v)", expected: "AB" }] },
      { title: "Race to Resolve", difficulty: "medium", desc: "Return first resolved value from array.", starter: "function fast(arr) {\n  return Promise.race(arr);\n}", tests: [{ input: "fast([Promise.resolve(1), Promise.resolve(2)]).then(v=>v)", expected: "1" }] },
      { title: "Always Run", difficulty: "medium", desc: "Log 'done' in <code>finally</code>.", starter: "function logDone(p) {\n  return p.finally(() => 'done');\n}", tests: [{ input: "typeof logDone", expected: "function" }] }
    ],
    17: [
      { title: "Is Fetch Available?", difficulty: "easy", desc: "Return true if fetch is a function.", starter: "function hasFetch() {\n  return typeof fetch === 'function';\n}", tests: [{ input: "hasFetch()", expected: "true" }] },
      { title: "Mock Success", difficulty: "easy", desc: "Return promise resolving to <code>{ok: true}</code>.", starter: "function mock() {\n  return Promise.resolve({ok: true});\n}", tests: [{ input: "mock().then(r=>r.ok)", expected: "true" }] },
      { title: "Extract JSON", difficulty: "medium", desc: "Extract JSON from response <code>res</code>.", starter: "function getJSON(res) {\n  return res.json();\n}", tests: [{ input: "getJSON({json: () => Promise.resolve({a:1})}).then(v=>v.a)", expected: "1" }] },
      { title: "Check OK", difficulty: "medium", desc: "Throw error if <code>res.ok</code> is false.", starter: "function checkOk(res) {\n  if(!res.ok) throw new Error();\n  return true;\n}", tests: [{ input: "checkOk({ok: true})", expected: "true" }] },
      { title: "Simple GET", difficulty: "medium", desc: "Check if GET is the default method.", starter: "function isGet() { return true; }", tests: [{ input: "isGet()", expected: "true" }] }
    ],
    18: [
      { title: "Object to JSON", difficulty: "easy", desc: "Stringify an object.", starter: "function stringify(obj) {\n  return JSON.stringify(obj);\n}", tests: [{ input: "stringify({a:1})", expected: '{"a":1}' }] },
      { title: "JSON to Object", difficulty: "easy", desc: "Parse a JSON string.", starter: "function parse(s) {\n  return JSON.parse(s);\n}", tests: [{ input: "parse('{\"a\":1}').a", expected: "1" }] },
      { title: "Pretty Print", difficulty: "medium", desc: "Stringify with 2 space indent.", starter: "function pretty(obj) {\n  return JSON.stringify(obj, null, 2);\n}", tests: [{ input: "pretty({a:1}).includes('\\n')", expected: "true" }] },
      { title: "Strip Undefined", difficulty: "medium", desc: "Demonstrate that undefined is removed in stringify.", starter: "function strip() {\n  return JSON.stringify({a: undefined, b: 1});\n}", tests: [{ input: "strip()", expected: '{"b":1}' }] },
      { title: "Deep Clone JSON", difficulty: "medium", desc: "Clone using parse/stringify.", starter: "function clone(obj) {\n  return JSON.parse(JSON.stringify(obj));\n}", tests: [{ input: "JSON.stringify(clone({x:1}))", expected: '{"x":1}' }] }
    ],
    19: [
      { title: "Wait and Get", difficulty: "easy", desc: "Await a promise and return value.", starter: "async function get(p) {\n  return await p;\n}", tests: [{ input: "get(Promise.resolve(5)).then(v=>v)", expected: "5" }] },
      { title: "Double Wait", difficulty: "easy", desc: "Await two promises and return sum.", starter: "async function sum(p1, p2) {\n  return (await p1) + (await p2);\n}", tests: [{ input: "sum(Promise.resolve(1), Promise.resolve(2)).then(v=>v)", expected: "3" }] },
      { title: "Mixed Async", difficulty: "medium", desc: "Return 10 after awaiting a promise.", starter: "async function ten() {\n  await Promise.resolve();\n  return 10;\n}", tests: [{ input: "ten().then(v=>v)", expected: "10" }] },
      { title: "Async Map", difficulty: "medium", desc: "Wait for all promises in array.", starter: "async function all(ps) {\n  return await Promise.all(ps);\n}", tests: [{ input: "all([Promise.resolve(1)]).then(v=>v[0])", expected: "1" }] },
      { title: "Await Loop", difficulty: "medium", desc: "Total from list of promises.", starter: "async function total(ps) {\n  let sum = 0;\n  for(let p of ps) sum += await p;\n  return sum;\n}", tests: [{ input: "total([Promise.resolve(10), Promise.resolve(5)]).then(v=>v)", expected: "15" }] }
    ],
    20: [
      { title: "Basic Catch", difficulty: "easy", desc: "Catch error and return 'err'.", starter: "function safe() {\n  try { throw 1; } catch(e) { return 'err'; }\n}", tests: [{ input: "safe()", expected: "err" }] },
      { title: "Finally Return", difficulty: "easy", desc: "Return 'final' from finally block.", starter: "function check() {\n  try { return 1; } finally { return 'final'; }\n}", tests: [{ input: "check()", expected: "final" }] },
      { title: "Message Tester", difficulty: "medium", desc: "Return error message.", starter: "function errorMsg() {\n  try { throw new Error('ops'); } catch(e) { return e.message; }\n}", tests: [{ input: "errorMsg()", expected: "ops" }] },
      { title: "Specific Throw", difficulty: "medium", desc: "Throw string 'STOP'.", starter: "function stop() {\n  throw 'STOP';\n}", tests: [{ input: "try{stop()}catch(e){console.log(e)}", expected: "STOP" }] },
      { title: "Nested Try", difficulty: "medium", desc: "Handle error in inner try.", starter: "function nested() {\n  try {\n    try { throw 'inner'; } catch(e) { return e; }\n  } catch(e) { return 'outer'; }\n}", tests: [{ input: "nested()", expected: "inner" }] }
    ],
  };
  if (exercises[id]) return exercises[id];
  return [{ title: "Practice Problem", difficulty: "easy", desc: `Write a function related to <strong>${TOPICS.find(t => t.id === id)?.title || 'this topic'}</strong>.`, starter: "function solve(input) {\n  // Your code here\n}", tests: [{ input: "solve(1)", expected: "1" }] }];
}

// Playground problems
const PROBLEMS = [
  { id: "p1", title: "Two Sum", difficulty: "easy", desc: "Given an array of numbers and a target, return indices of two numbers that add up to the target.", starter: "function twoSum(nums, target) {\n  // Return [i, j] where nums[i]+nums[j]===target\n}", tests: [{ input: "JSON.stringify(twoSum([2,7,11,15],9))", expected: "[0,1]" }, { input: "JSON.stringify(twoSum([3,2,4],6))", expected: "[1,2]" }] },
  { id: "p2", title: "Reverse String", difficulty: "easy", desc: "Write a function that reverses a string.", starter: "function reverseStr(s) {\n  // Return reversed string\n}", tests: [{ input: 'reverseStr("hello")', expected: "olleh" }, { input: 'reverseStr("world")', expected: "dlrow" }] },
  { id: "p3", title: "Palindrome Check", difficulty: "easy", desc: "Check if a string is a palindrome (reads same forwards and backwards).", starter: "function isPalindrome(s) {\n  // Return true or false\n}", tests: [{ input: 'String(isPalindrome("racecar"))', expected: "true" }, { input: 'String(isPalindrome("hello"))', expected: "false" }] },
  { id: "p4", title: "FizzBuzz", difficulty: "easy", desc: "Return an array from 1 to n. For multiples of 3 use 'Fizz', multiples of 5 use 'Buzz', both use 'FizzBuzz'.", starter: "function fizzBuzz(n) {\n  // Return array\n}", tests: [{ input: 'JSON.stringify(fizzBuzz(5))', expected: '["1","2","Fizz","4","Buzz"]' }] },
  { id: "p5", title: "Max Subarray Sum", difficulty: "medium", desc: "Find the contiguous subarray with the largest sum.", starter: "function maxSubArray(nums) {\n  // Return max sum\n}", tests: [{ input: "maxSubArray([-2,1,-3,4,-1,2,1,-5,4])", expected: "6" }, { input: "maxSubArray([1])", expected: "1" }] },
  { id: "p6", title: "Flatten Array", difficulty: "medium", desc: "Flatten a nested array to a single level.", starter: "function flatten(arr) {\n  // Return flat array\n}", tests: [{ input: "JSON.stringify(flatten([1,[2,[3,[4]]]]))", expected: "[1,2,3,4]" }] },
  { id: "p7", title: "Anagram Check", difficulty: "medium", desc: "Check if two strings are anagrams.", starter: "function isAnagram(s, t) {\n  // Return boolean\n}", tests: [{ input: 'String(isAnagram("listen","silent"))', expected: "true" }, { input: 'String(isAnagram("hello","world"))', expected: "false" }] },
  { id: "p8", title: "Debounce Function", difficulty: "hard", desc: "Implement a debounce function.", starter: "function debounce(fn, delay) {\n  // Return debounced function\n}", tests: [{ input: '"typeof debounce(()=>{},100)"', expected: "function" }] },
];

// Exam data
function generateExamData() {
  const mcqs = [
    { q: "typeof [] returns?", opts: ["array", "object", "undefined", "null"], ans: 1 },
    { q: "Which is NOT falsy?", opts: ["0", "\"\"", "\" \"", "null"], ans: 2 },
    { q: "let vs const?", opts: ["let can reassign", "const can reassign", "Both same", "Neither can"], ans: 0 },
    { q: "Array.isArray([]) returns?", opts: ["true", "false", "undefined", "error"], ans: 0 },
    { q: "What does push() return?", opts: ["undefined", "the array", "new length", "the element"], ans: 2 },
    { q: "Promise.all fails if?", opts: ["Any rejects", "All reject", "None reject", "First resolves"], ans: 0 },
    { q: "async function returns?", opts: ["undefined", "value", "Promise", "callback"], ans: 2 },
    { q: "JSON.parse('{}') returns?", opts: ["string", "null", "empty object", "error"], ans: 2 },
    { q: "for...of works on?", opts: ["objects only", "iterables", "numbers", "keys"], ans: 1 },
    { q: "NaN === NaN is?", opts: ["true", "false", "NaN", "error"], ans: 1 },
    { q: "'use strict' prevents?", opts: ["all errors", "undeclared vars usage", "async code", "loops"], ans: 1 },
    { q: "Object.freeze prevents?", opts: ["reading", "all modifications", "deletion only", "nothing"], ans: 1 },
    { q: "Spread operator is?", opts: ["...", "::", "**", ">>"], ans: 0 },
    { q: "Which creates a shallow copy?", opts: ["= assignment", "Object.assign", "JSON.parse(JSON.stringify())", "None"], ans: 1 },
    { q: "setTimeout 0 runs?", opts: ["immediately", "after sync code", "never", "before sync"], ans: 1 },
    { q: "map() returns?", opts: ["undefined", "new array", "boolean", "number"], ans: 1 },
    { q: "reduce() takes?", opts: ["callback only", "callback, initial", "array only", "nothing"], ans: 1 },
    { q: "await can be used in?", opts: ["any function", "async function", "global only", "class only"], ans: 1 },
    { q: "try without catch needs?", opts: ["nothing", "finally", "throw", "return"], ans: 1 },
    { q: "Arrow functions?", opts: ["have own this", "inherit this", "no return", "are hoisted"], ans: 1 },
  ];
  const outputQs = [
    { code: 'console.log(2+"2");', answer: "22" },
    { code: 'console.log(2-"1");', answer: "1" },
    { code: 'console.log(typeof typeof 1);', answer: "string" },
    { code: 'console.log([1,2,3].map(String));', answer: "1,2,3" },
    { code: 'console.log(..."hello");', answer: "h e l l o" },
    { code: 'let a=[1,2,3];let b=a;b.push(4);\nconsole.log(a.length);', answer: "4" },
    { code: 'console.log(Boolean([]));', answer: "true" },
    { code: 'console.log(1+2+"3");', answer: "33" },
    { code: 'console.log("3"+2+1);', answer: "321" },
    { code: 'const {a:b}={a:5};\nconsole.log(b);', answer: "5" },
  ];
  const codingProblems = [
    {
      title: "Two-player Game",
      difficulty: "easy",
      desc: "Naman and Arun play a game where they get scores alternately (Naman starts). The first player to get a negative score loses. Return the name of the winner.\n\n**Example:** `[1, 4, 7, 3, 0, -2]` -> Arun gets -2 first, so Naman wins.",
      starter: "function findWinner(scores) {\n  // Your code here\n}",
      tests: [
        { input: "findWinner([1, 4, 7, 3, 0, -2, -4, 5])", expected: "Naman" },
        { input: "findWinner([-1, 5, 0])", expected: "Arun" }
      ]
    },
    {
      title: "Salary Tax Calculator",
      difficulty: "easy",
      desc: "Calculate tax based on salary slabs:\n- Up to 500,000: 0%\n- 500,001 - 1,000,000: 10%\n- 1,000,001 - 1,500,000: 20%\n- Above 1,500,000: 30%\n- Return 'Salary not valid' if salary <= 0.\n\n**Hint:** Use `switch(true)` for range matching.",
      starter: "function findTax(salary) {\n  // Your code here using Switch Case\n}",
      tests: [
        { input: "findTax(-100)", expected: "Salary not valid" },
        { input: "findTax(400000)", expected: "0" },
        { input: "findTax(600000)", expected: "60000" },
        { input: "findTax(1200000)", expected: "240000" }
      ]
    },
    {
      title: "N trials",
      difficulty: "medium",
      desc: "Implement a higher-order function `runNTimes(fn, n)` that takes a zero-argument function `fn` and a natural number `n`.\n\n**Requirements:**\n- Invoke `fn()` exactly `n` times.\n- Log each result to the console after applying `JSON.stringify()`.\n\n**Example:** `runNTimes(()=>42, 3)` should log `42` three times.",
      starter: "function runNTimes(fn, n) {\n  // Your code here\n}",
      tests: [
        {
          input: "(function(){ let count=0; const fn=()=>++count; runNTimes(fn, 3); return count; })()",
          expected: "3",
          explanation: "Function should be called exactly 3 times."
        }
      ]
    },
    {
      title: "Amazon's grocery store",
      difficulty: "medium",
      desc: "Implement `processGroceryOrder(order, availableStock)` to process orders asynchronously.\n\n**Logic:**\n1. Check if the item exists in `availableStock`.\n2. Check if requested quantity exceeds available stock.\n3. **Simulate Delay**: Wait for 2 seconds using a `Promise`.\n4. **Update Stock**: Reduce inventory on success.\n\n**Returns**: Promise resolving with `'Order processed successfully!'` or rejecting with specific logic-based error messages.",
      starter: "function processGroceryOrder(order, availableStock) {\n  // Implement with Promise and 2s delay\n}",
      tests: [
        {
          input: "processGroceryOrder({item:'Apple', quantity:3}, {Apple:{quantity:10, price:2, category:'Fruits'}}).then(res=>res).catch(err=>err)",
          expected: "Order processed successfully!"
        },
        {
          input: "processGroceryOrder({item:'Maida', quantity:4}, {Rice:{quantity:10}}).then(res=>res).catch(err=>err)",
          expected: "Order failed! Item not found."
        }
      ]
    },
    {
      title: "Data Cleanup for Analytics System",
      difficulty: "medium",
      desc: "Convert object keys from `snake_case` to strictly lowercase (remove underscores). Return a new object with the same values and preserved key order.\n\n**Example:** `{ user_id: 101 }` becomes `{ userid: 101 }`.",
      starter: "function normalizeKeys(user) {\n  // Your code here\n}",
      tests: [{ input: "JSON.stringify(normalizeKeys({user_id: 101, account_status: 'active', country: 'argentina'}))", expected: '{"userid":101,"accountstatus":"active","country":"argentina"}' }]
    },
    {
      title: "The E-Sports Leaderboard",
      difficulty: "hard",
      desc: "Sort an array of players based on these rules:\n1. **Points**: Descending order (highest first).\n2. **Win Streak**: If points tie, sort by win streak descending.\n3. **Username**: If both tie, sort alphabetically (A-Z).\n\n**Player Structure:** `{ username, points, winStreak }`.\nReturn the sorted array.",
      starter: "function generateLeaderboard(players) {\n  // Your code here\n}",
      tests: [
        {
          input: "JSON.stringify(generateLeaderboard([\n  {username:'Shadow', points:500, winStreak:10},\n  {username:'Ninja', points:400, winStreak:5},\n  {username:'Samurai', points:400, winStreak:15},\n  {username:'Archer', points:400, winStreak:5}\n]).map(p=>p.username))",
          expected: '["Shadow","Samurai","Archer","Ninja"]',
          explanation: "Shadow has most points. Samurai has better streak than Ninja/Archer. Archer comes before Ninja alphabetically."
        },
        {
          input: "JSON.stringify(generateLeaderboard([\n  {username:'Dragon', points:1000, winStreak:5},\n  {username:'Zeta', points:800, winStreak:10},\n  {username:'Alpha', points:800, winStreak:10},\n  {username:'Phoenix', points:800, winStreak:20},\n  {username:'Goblin', points:200, winStreak:0}\n]).map(p=>p.username))",
          expected: '["Dragon","Phoenix","Alpha","Zeta","Goblin"]'
        }
      ]
    },
    {
      title: "Print Diamond Pattern in js",
      difficulty: "medium",
      desc: "Write a function `printDiamond(n)` that logs a diamond pattern of height `2n-1` to the console using asterisks (`* `) and double spaces (`  `) for indentation.\n\n**Example (n=2):**\n```\n  * \n* * * \n  * \n```",
      starter: "function printDiamond(n) {\n  // Your code here\n}",
      tests: [
        {
          input: "(function(){ let logs=[]; const oldLog=console.log; console.log=m=>logs.push(m.trimEnd()); printDiamond(2); console.log=oldLog; return logs.join('\\n'); })()",
          expected: "  *\n* * *\n  *"
        },
        {
          input: "(function(){ let logs=[]; const oldLog=console.log; console.log=m=>logs.push(m.trimEnd()); printDiamond(3); console.log=oldLog; return logs.length; })()",
          expected: "5",
          explanation: "For n=3, height should be 2n-1 = 5."
        }
      ]
    },
    {
      title: "Go with the flow!",
      difficulty: "hard",
      desc: "Write a function `chainFunctions` that takes one or more functions as input and returns a new function.\n\n**Requirements:**\n- When the new function is called with an array, it calls each function in order.\n- The first function (`add`) receives all elements of the array (spread).\n- Subsequent functions receive the result of the previous function.\n- Note: `add` and `square` are provided in the environment.\n\n**Example:** `chainFunctions(add, square, square)([1, 3])` returns `256`.",
      starter: "function chainFunctions(...funcs) {\n  // Your code here\n}",
      tests: [
        { input: "(function(){ const add=(a,b)=>a+b; const square=x=>x**2; return chainFunctions(add, square, square)([1,3]); })()", expected: "256" },
        { input: "(function(){ const add=(a,b)=>a+b; const square=x=>x**2; return chainFunctions(add, square, square)([4,1]); })()", expected: "625" }
      ]
    },
    {
      title: "Simulate delay with await",
      difficulty: "medium",
      desc: "Implement asynchronous logic inside `solve(userName, ms)` using only `async / await`.\n\n**Requirements:**\n- Implement `delay(ms)`: returns a Promise that resolves with `userName` after `ms`.\n- Implement `getNameAfterDelay()`: async, calls `await delay(ms)`, returns the value. Must not take parameters (access `ms` and `userName` via closure).\n- Inside `solve`, call `getNameAfterDelay()` using `await`, log the result, and return it.\n\n**Constraints:** Time Limit: 2s, Memory: 128MB. No `.then()` allowed.",
      starter: "async function solve(userName, ms) {\n  // Write your solution below \n}",
      tests: [{ input: "solve('Carol', 100)", expected: "Carol" }, { input: "solve('Alice', 50)", expected: "Alice" }]
    },
    {
      title: "Chain Some Math with Promises",
      difficulty: "medium",
      desc: "Perform sequential math operations using Promise chaining (`.then()`).\n\n**Steps:**\n1. Double the number.\n2. Add 10 to the result.\n3. Multiply by 3.\n\n**Requirements:**\n- Create `double(value)`, `addTen(value)`, and `multiplyByThree(value)` returning Promises.\n- Chain them starting from `double`.\n- Log and return the final value.\n\n**Constraints:** Time Limit: 2s, Memory: 128MB.",
      starter: "function solve(value) {\n  // Implement functions and chain them below\n}",
      tests: [{ input: "solve(5).then(res => String(res))", expected: "60" }, { input: "solve(10).then(res => String(res))", expected: "90" }]
    },
    {
      title: "Categorize By Key",
      difficulty: "hard",
      desc: "Write an async function `categorizeByKey(api, key)` that fetches data from an API and groups the objects based on the provided `key`. \n\n**Requirements:**\n- Fetch data and convert to JSON.\n- Return a object where keys are the category names.\n- Values should be arrays of objects belonging to that category.\n- Ignore objects that don't have the specified key.",
      starter: "function categorizeByKey(api, key) {\n  return fetch(api)\n    .then(res => res.json())\n    .then(data => {\n      // Your grouping logic here\n    });\n}",
      tests: [
        {
          input: "categorizeByKey('https://jsonplaceholder.typicode.com/posts', 'userId').then(res => Object.keys(res).length)",
          expected: "10",
          explanation: "Categorizing 100 posts by userId should result in 10 unique user keys."
        },
        {
          input: "categorizeByKey('https://jsonplaceholder.typicode.com/todos', 'completed').then(res => Array.isArray(res['true']))",
          expected: "true",
          explanation: "Checks if the 'true' category contains an array of completed todos."
        }
      ]
    },

    { title: "Marriage Eligibility Promise", difficulty: "hard", desc: "Write a function `checkMarriageEligibility(age, gender)` that returns a **Promise**. \n\n**Criteria:**\n- Men: 21 or older\n- Women: 18 or older\n\n**Promise Behavior:**\n- If eligible: Resolve with `\"You are eligible for marriage in India.\"`\n- If not eligible: Reject with `\"You are not eligible for marriage in India.\"`", starter: "function checkMarriageEligibility(age, gender) {\n  return new Promise((resolve, reject) => {\n    // Your code here\n  });\n}", tests: [{ input: "checkMarriageEligibility(25, 'male').then(m=>m).catch(m=>m)", expected: "You are eligible for marriage in India." }, { input: "checkMarriageEligibility(17, 'female').then(m=>m).catch(m=>m)", expected: "You are not eligible for marriage in India." }] },
    { title: "Compare Pokémon Experience", difficulty: "hard", desc: "Compare the `base_experience` of two Pokémon using the PokeAPI: `https://pokeapi.co/api/v2/pokemon/{name}`. \n\n**Return Format:**\n- `{ winner: 'name', base_experience: X }` if one is higher.\n- `{ tie: true, base_experience: X }` if equal.", starter: "async function comparePokemonExperience(name1, name2) {\n  // fetch from https://pokeapi.co/api/v2/pokemon/name\n  // compare base_experience\n}", tests: [{ input: "comparePokemonExperience('pikachu', 'charmander').then(res => JSON.stringify(res))", expected: '{"winner":"pikachu","base_experience":112}' }, { input: "comparePokemonExperience('caterpie', 'weedle').then(res => JSON.stringify(res))", expected: '{"tie":true,"base_experience":39}' }] },

    {
      title: "Promise all",
      difficulty: "hard",
      desc: "Implement a function `promiseAll(promises)` that replicates the behavior of `Promise.all()`.\n\n**Requirements:**\n- If all resolve, resolve with an array of values in the **original order**.\n- If any reject, reject immediately with that error value.\n- If the input array is empty, resolve immediately with `[]`.\n\n**Constraints:** Time Limit: 2s, Memory: 128MB. Maintain the original order regardless of timing.",
      starter: "function promiseAll(promises) {\n  // Your code here \n}",
      tests: [
        {
          input: "promiseAll([new Promise(res => setTimeout(() => res(99), 50)), new Promise(res => setTimeout(() => res(42), 10))]).then(res => JSON.stringify(res))",
          expected: "[99,42]",
          explanation: "Maintain original order even if second promise finishes first."
        },
        {
          input: "promiseAll([Promise.resolve(100), Promise.reject('Fail')]).catch(err => err)",
          expected: "Fail",
          explanation: "Reject immediately if any promise fails."
        },
        {
          input: "promiseAll([]).then(res => JSON.stringify(res))",
          expected: "[]",
          explanation: "Return empty array for empty input."
        }
      ]
    },
  ];
  return { mcqs, outputQs, codingProblems };
}

// Badges
const BADGES = [
  { id: "first_code", icon: "🏁", name: "First Code", desc: "Run your first code", check: (p) => p.totalRuns >= 1 },
  { id: "five_solved", icon: "⭐", name: "5 Solved", desc: "Solve 5 problems", check: (p) => p.solved >= 5 },
  { id: "ten_solved", icon: "🌟", name: "10 Solved", desc: "Solve 10 problems", check: (p) => p.solved >= 10 },
  { id: "first_topic", icon: "📖", name: "First Topic", desc: "Complete 1 topic", check: (p) => p.completedTopics >= 1 },
  { id: "half_topics", icon: "📚", name: "Halfway", desc: "Complete 10 topics", check: (p) => p.completedTopics >= 10 },
  { id: "all_topics", icon: "🎓", name: "Graduate", desc: "Complete all topics", check: (p) => p.completedTopics >= 21 },
  { id: "exam_taken", icon: "📝", name: "Exam Taker", desc: "Take the exam", check: (p) => p.examsTaken >= 1 },
  { id: "exam_pass", icon: "🏆", name: "Exam Pass", desc: "Score 60+ on exam", check: (p) => p.bestExamScore >= 60 },
  { id: "exam_ace", icon: "💯", name: "Perfectionist", desc: "Score 90+ on exam", check: (p) => p.bestExamScore >= 90 },
  { id: "streak3", icon: "🔥", name: "On Fire", desc: "3 day streak", check: (p) => p.streak >= 3 },
  { id: "streak7", icon: "💎", name: "Diamond", desc: "7 day streak", check: (p) => p.streak >= 7 },
  { id: "mcq_master", icon: "🎯", name: "MCQ Master", desc: "100% on any MCQ quiz", check: (p) => p.perfectMCQ >= 1 }
];
