const form = document.querySelector("#form"),
  students = [];
let nextId = 1;
function grade(n) {
  if (n >= 90) return "A+";
  if (n >= 80) return "A";
  if (n >= 70) return "B";
  if (n >= 60) return "C";
  if (n >= 50) return "D";
  if (n >= 33) return "E";
  return "F";
}
function render() {
  const q = document.querySelector("#search").value.trim().toLowerCase(),
    sort = document.querySelector("#sort").value;
  const visible = students.filter(
    (s) => s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q),
  );
  visible.sort((a, b) =>
    sort === "high"
      ? b.marks - a.marks
      : sort === "low"
        ? a.marks - b.marks
        : a.name.localeCompare(b.name),
  );
  const list = document.querySelector("#list");
  list.replaceChildren();
  visible.forEach((s) => {
    const tr = document.createElement("tr");
    [s.name, s.roll, s.marks, grade(s.marks)].forEach((v) => {
      const td = document.createElement("td");
      td.textContent = v;
      tr.append(td);
    });
    const td = document.createElement("td"),
      button = document.createElement("button");
    button.textContent = "Delete";
    button.className = "delete";
    button.dataset.id = s.id;
    td.append(button);
    tr.append(td);
    list.append(tr);
  });
  document.querySelector("#count").textContent = students.length;
  document.querySelector("#empty").textContent = visible.length
    ? ""
    : q
      ? "No matching students."
      : "No students yet.";
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value.trim(),
    roll = document.querySelector("#roll").value.trim(),
    raw = document.querySelector("#marks").value,
    marks = Number(raw),
    msg = document.querySelector("#message");
  if (
    !name ||
    !roll ||
    raw === "" ||
    !Number.isInteger(marks) ||
    marks < 0 ||
    marks > 100
  ) {
    msg.textContent = "Enter name, roll, and whole-number marks from 0 to 100.";
    return;
  }
  if (students.some((s) => s.roll.toLowerCase() === roll.toLowerCase())) {
    msg.textContent = "Roll number already exists.";
    return;
  }
  students.push({ id: nextId++, name, roll, marks });
  form.reset();
  msg.textContent = "Student added.";
  render();
});
document.querySelector("#list").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-id]");
  if (!b) return;
  const i = students.findIndex((s) => s.id === Number(b.dataset.id));
  if (i >= 0) students.splice(i, 1);
  render();
});
document.querySelector("#search").addEventListener("input", render);
document.querySelector("#sort").addEventListener("change", render);
render();
