const key = "js-phase2-expenses";
let expenses = JSON.parse(localStorage.getItem(key) || "[]");
const form = document.querySelector("#form");
function render() {
  const list = document.querySelector("#list");
  list.replaceChildren();
  expenses.forEach((x, i) => {
    const li = document.createElement("li");
    li.textContent = `${x.title}: ₹${x.amount.toFixed(2)} `;
    const b = document.createElement("button");
    b.textContent = "Delete";
    b.onclick = () => {
      expenses.splice(i, 1);
      save();
    };
    li.append(b);
    list.append(li);
  });
  document.querySelector("#total").textContent = expenses
    .reduce((sum, x) => sum + x.amount, 0)
    .toFixed(2);
}
function save() {
  localStorage.setItem(key, JSON.stringify(expenses));
  render();
}
form.onsubmit = (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value.trim(),
    raw = document.querySelector("#amount").value,
    amount = Number(raw);
  if (!title || raw === "" || !Number.isFinite(amount) || amount <= 0) return;
  expenses.push({ title, amount });
  form.reset();
  save();
};
render();
