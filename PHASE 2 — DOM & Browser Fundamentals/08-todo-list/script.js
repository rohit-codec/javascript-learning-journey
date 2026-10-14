const form = document.querySelector("#form"),
  input = document.querySelector("#task"),
  list = document.querySelector("#list");
function count() {
  document.querySelector("#count").textContent =
    `${list.children.length} task(s)`;
}
form.onsubmit = (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li"),
    span = document.createElement("span"),
    done = document.createElement("button"),
    del = document.createElement("button");
  span.textContent = text;
  done.textContent = "Done";
  done.dataset.action = "done";
  del.textContent = "Delete";
  del.dataset.action = "delete";
  li.append(span, done, del);
  list.append(li);
  input.value = "";
  count();
};
list.onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.action === "delete") b.parentElement.remove();
  if (b.dataset.action === "done") b.parentElement.classList.toggle("done");
  count();
};
