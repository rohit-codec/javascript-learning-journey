let contacts = [];
const form = document.querySelector("#form");
function render() {
  const q = document.querySelector("#search").value.toLowerCase(),
    list = document.querySelector("#list");
  list.replaceChildren();
  contacts
    .filter((c) => (c.name + " " + c.email).toLowerCase().includes(q))
    .forEach((c) => {
      const li = document.createElement("li");
      li.textContent = `${c.name} · ${c.email} · ${c.phone}`;
      list.append(li);
    });
}
form.onsubmit = (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value.trim(),
    email = document.querySelector("#email").value.trim(),
    phone = document.querySelector("#phone").value.trim();
  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !/^[0-9+() -]{7,}$/.test(phone)
  ) {
    document.querySelector("#message").textContent =
      "Enter valid contact details.";
    return;
  }
  contacts.push({ name, email, phone });
  form.reset();
  render();
};
document.querySelector("#search").oninput = render;
document.querySelector("#export").onclick = () => {
  const blob = new Blob([JSON.stringify(contacts, null, 2)], {
      type: "application/json",
    }),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = "contacts.json";
  a.click();
  URL.revokeObjectURL(url);
};
render();
