const display = document.querySelector("#display");
const status = document.querySelector("#status");
let expression = "";
let finished = false;
function render() {
  display.textContent = expression || "0";
}
function clear() {
  expression = "";
  finished = false;
  status.textContent = "Ready";
  render();
}
function append(value) {
  if (value === "%") value = "%";
  if (finished && !/[+\-*/%]/.test(value)) expression = "";
  finished = false;
  if (
    value === "." &&
    expression
      .split(/[+\-*/%]/)
      .pop()
      .includes(".")
  )
    return;
  if (/[+\-*/%]/.test(value) && !expression && value !== "-") return;
  if (/[+\-*/%]$/.test(expression) && /[+\-*/%]/.test(value))
    expression = expression.slice(0, -1);
  expression += value;
  status.textContent = "Entering calculation";
  render();
}
function calculate() {
  if (!expression || /[+\-*/%.]$/.test(expression)) {
    status.textContent = "Enter a complete calculation";
    return;
  }
  if (!/^[0-9+\-*/%.]+$/.test(expression)) {
    status.textContent = "Invalid calculation";
    return;
  }
  try {
    const result = Function('"use strict";return (' + expression + ")")();
    if (!Number.isFinite(result)) throw Error();
    expression = String(Number(result.toFixed(8)));
    finished = true;
    status.textContent = "Result";
    render();
  } catch {
    status.textContent = "Calculation error";
  }
}
function back() {
  expression = expression.slice(0, -1);
  finished = false;
  render();
}
document.querySelector(".keys").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const a = b.dataset.action;
  if (a === "clear") clear();
  else if (a === "back") back();
  else if (a === "equals") calculate();
  else if (b.dataset.value !== undefined) append(b.dataset.value);
});
document.addEventListener("keydown", (e) => {
  if (/^[0-9.+\-*/%]$/.test(e.key)) append(e.key);
  else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculate();
  } else if (e.key === "Backspace") back();
  else if (e.key === "Escape") clear();
});
clear();
