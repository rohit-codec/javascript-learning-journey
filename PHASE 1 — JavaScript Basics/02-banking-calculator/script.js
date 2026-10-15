const initial = 10000;
let balance = initial;
const output = document.querySelector("#balance");
const amountInput = document.querySelector("#amount");
const message = document.querySelector("#message");
const history = document.querySelector("#history");
const transactions = [];
const money = (n) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
        n,
    );
function render() {
    output.textContent = money(balance);
    history.replaceChildren();
    if (!transactions.length) {
        const li = document.createElement("li");
        li.textContent = "No transactions yet.";
        history.append(li);
        return;
    }
    transactions
        .slice()
        .reverse()
        .forEach((t) => {
            const li = document.createElement("li");
            li.textContent = `${t.type}: ${money(t.amount)} — balance ${money(t.balance)}`;
            history.append(li);
        });
}
function transact(type) {
    const raw = amountInput.value;
    const amount = Number(raw);
    if (raw === "" || !Number.isFinite(amount) || amount <= 0) {
        message.textContent = "Enter an amount greater than zero.";
        return;
    }
    if (type === "Withdraw" && amount > balance) {
        message.textContent = "Insufficient balance.";
        return;
    }
    balance += type === "Deposit" ? amount : -amount;
    transactions.push({ type, amount, balance });
    message.textContent = `${type} successful: ${money(amount)}.`;
    amountInput.value = "";
    render();
}
document
    .querySelector("#deposit")
    .addEventListener("click", () => transact("Deposit"));
document
    .querySelector("#withdraw")
    .addEventListener("click", () => transact("Withdraw"));
document.querySelector("#interest").addEventListener("click", () => {
    const rate = Number(document.querySelector("#rate").value);
    const months = Number(document.querySelector("#months").value);
    if (
        rate < 0 ||
        rate > 100 ||
        !Number.isFinite(rate) ||
        !Number.isInteger(months) ||
        months < 1
    ) {
        document.querySelector("#interest-result").textContent =
            "Enter a rate from 0–100 and positive whole months.";
        return;
    }
    const interest = (((balance * rate) / 100) * months) / 12;
    document.querySelector("#interest-result").textContent =
        `Interest: ${money(interest)}. Balance + interest: ${money(balance + interest)}.`;
});
document.querySelector("#reset").addEventListener("click", () => {
    balance = initial;
    transactions.length = 0;
    amountInput.value = "";
    message.textContent = "Demo account reset.";
    document.querySelector("#interest-result").textContent = "";
    render();
});
render();
