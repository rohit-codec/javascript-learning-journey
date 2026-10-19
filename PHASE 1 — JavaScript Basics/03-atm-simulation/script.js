let balance = 5000;
let pin = "1234";
let ended = false;
const balanceEl = document.querySelector("#balance");
const statusEl = document.querySelector("#status");
const area = document.querySelector("#action-area");
const money = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    n,
  );
function update(message) {
  balanceEl.textContent = money(balance);
  statusEl.textContent = message;
}
function note(text, type = "") {
  area.replaceChildren();
  const p = document.createElement("p");
  p.className = type;
  p.textContent = text;
  area.append(p);
}
function ask(label, type, placeholder, callback) {
  area.replaceChildren();
  const form = document.createElement("form");
  const l = document.createElement("label");
  l.textContent = label;
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.required = true;
  const submit = document.createElement("button");
  submit.textContent = "Confirm";
  form.append(l, input, submit);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    callback(input.value.trim());
  });
  area.append(form);
  input.focus();
}
document.querySelector("#menu").addEventListener("click", (e) => {
  const button = e.target.closest("button[data-action]");
  if (!button) return;
  if (ended) {
    ended = false;
  }
  const action = button.dataset.action;
  if (action === "balance") {
    update("Balance checked.");
    note(`Available balance: ${money(balance)}.`, "success");
  } else if (action === "deposit" || action === "withdraw") {
    const deposit = action === "deposit";
    ask(
      deposit ? "Deposit amount" : "Withdrawal amount",
      "number",
      "Enter amount",
      (raw) => {
        const amount = Number(raw);
        if (!raw || !Number.isFinite(amount) || amount <= 0) {
          note("Enter a valid amount greater than zero.", "error");
          return;
        }
        if (!deposit && amount > balance) {
          note("Insufficient balance.", "error");
          return;
        }
        balance += deposit ? amount : -amount;
        update(`${deposit ? "Deposit" : "Withdrawal"} complete.`);
        note(
          `${deposit ? "Deposited" : "Withdrawn"} ${money(amount)}. New balance: ${money(balance)}.`,
          "success",
        );
      },
    );
  } else if (action === "pin") {
    ask("Enter current demo PIN", "password", "Starting PIN is 1234", (old) => {
      if (old !== pin) {
        note("Incorrect PIN.", "error");
        return;
      }
      ask("Enter new 4-digit PIN", "password", "New PIN", (next) => {
        if (!/^\d{4}$/.test(next)) {
          note("PIN must contain exactly 4 digits.", "error");
          return;
        }
        pin = next;
        note("Demo PIN updated.", "success");
      });
    });
  } else {
    ended = true;
    update("Session ended. Select any option to start again.");
    note("Thank you for trying the demo ATM.");
  }
});
update("Welcome! Select an operation.");
