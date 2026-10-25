const form = document.querySelector("#form"),
  message = document.querySelector("#message");
form.onsubmit = (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value.trim(),
    email = document.querySelector("#email").value.trim(),
    p = document.querySelector("#password").value,
    c = document.querySelector("#confirm").value;
  if (!name || !email || !p || !c) {
    message.textContent = "Complete every field.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    message.textContent = "Enter a valid email.";
    return;
  }
  if (p.length < 8) {
    message.textContent = "Password must be at least 8 characters.";
    return;
  }
  if (p !== c) {
    message.textContent = "Passwords do not match.";
    return;
  }
  message.textContent = `Form validated for ${name}. Demo only; no data was sent.`;
};
