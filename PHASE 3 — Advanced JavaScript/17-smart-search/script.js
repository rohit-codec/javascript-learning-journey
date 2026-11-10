const products =[
  "Laptop",
  "Wireless Mouse",
  "Mechanical Keyboard",
  "Monitor",
  "USB-C Hub",
  "Webcam",
  "Headphones",
  "Laptop Stand",
];
const cache = new Map(),
  input = document.querySelector("#search"),
  list = document.querySelector("#results");
let timer;
function find(q) {
  const key = q.toLowerCase();
  if (!cache.has(key))
    cache.set(
      key,
      products.filter((p) => p.toLowerCase().includes(key)),
    );
  return cache.get(key);
}
function render() {
  const results = find(input.value.trim());
  list.replaceChildren();
  results.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    list.append(li);
  });
  document.querySelector("#count").textContent = `${results.length} result(s)`;
}
input.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(render, 250);
});
render();
