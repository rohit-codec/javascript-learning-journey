const form = document.querySelector("#form"),
  products = [];
let nextId = 1;
const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);
function render() {
  const q = document.querySelector("#search").value.trim().toLowerCase(),
    visible = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    ),
    list = document.querySelector("#list");
  list.replaceChildren();
  visible.forEach((p) => {
    const tr = document.createElement("tr");
    [
      p.name,
      p.category,
      money(p.price),
      p.stock,
      money(p.price * p.stock),
    ].forEach((v) => {
      const td = document.createElement("td");
      td.textContent = v;
      tr.append(td);
    });
    const td = document.createElement("td");
    [
      ["+1", "add"],
      ["−1", "remove"],
      ["Delete", "delete"],
    ].forEach(([text, action]) => {
      const b = document.createElement("button");
      b.textContent = text;
      b.className = `small ${action === "delete" ? "danger" : "stock"}`;
      b.dataset.id = p.id;
      b.dataset.action = action;
      td.append(b);
    });
    tr.append(td);
    list.append(tr);
  });
  document.querySelector("#count").textContent = products.length;
  document.querySelector("#units").textContent = products.reduce(
    (s, p) => s + p.stock,
    0,
  );
  document.querySelector("#value").textContent = money(
    products.reduce((s, p) => s + p.price * p.stock, 0),
  );
  document.querySelector("#empty").textContent = visible.length
    ? ""
    : q
      ? "No matching products."
      : "No products yet.";
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value.trim(),
    category = document.querySelector("#category").value.trim(),
    rp = document.querySelector("#price").value,
    rs = document.querySelector("#stock").value,
    price = Number(rp),
    stock = Number(rs),
    msg = document.querySelector("#message");
  if (
    !name ||
    !category ||
    rp === "" ||
    rs === "" ||
    !Number.isFinite(price) ||
    price <= 0 ||
    !Number.isInteger(stock) ||
    stock < 0
  ) {
    msg.textContent =
      "Enter valid details, a positive price, and whole-number stock.";
    return;
  }
  products.push({ id: nextId++, name, category, price, stock });
  form.reset();
  msg.textContent = "Product added.";
  render();
});
document.querySelector("#list").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-action]");
  if (!b) return;
  const i = products.findIndex((p) => p.id === Number(b.dataset.id));
  if (i < 0) return;
  if (b.dataset.action === "delete") products.splice(i, 1);
  else if (b.dataset.action === "add") products[i].stock++;
  else if (products[i].stock > 0) products[i].stock--;
  render();
});
document.querySelector("#search").addEventListener("input", render);
render();
