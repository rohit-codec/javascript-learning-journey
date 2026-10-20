const input = document.querySelector("#text");
const sample =
  "JavaScript is powerful. JavaScript is popular, and JavaScript is fun to learn!";
function wordsOf(text) {
  return text.trim().match(/[\p{L}\p{N}']+/gu) || [];
}
function analyze() {
  const text = input.value;
  const words = wordsOf(text);
  const sentenceCount = text.trim()
    ? (text.trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter((s) =>
        s.trim(),
      ).length
    : 0;
  const longest = words.reduce(
    (best, w) => (w.length > best.length ? w : best),
    "",
  );
  const counts = new Map();
  words.forEach((w) => {
    const key = w.toLowerCase();
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  let frequent = "—",
    max = 0;
  for (const [word, count] of counts) {
    if (count > max) {
      max = count;
      frequent = `${word} (${count})`;
    }
  }
  document.querySelector("#chars").textContent = text.length;
  document.querySelector("#no-space").textContent = text.replace(
    /\s/g,
    "",
  ).length;
  document.querySelector("#words").textContent = words.length;
  document.querySelector("#sentences").textContent = sentenceCount;
  document.querySelector("#time").textContent = words.length
    ? Math.max(1, Math.ceil(words.length / 200)) + " min"
    : "0 min";
  document.querySelector("#longest").textContent = longest || "—";
  document.querySelector("#frequent").textContent = frequent;
}
document.querySelector("#analyze").addEventListener("click", analyze);
document.querySelector("#clear").addEventListener("click", () => {
  input.value = "";
  analyze();
  document.querySelector("#message").textContent = "Text cleared.";
});
document.querySelector("#sample").addEventListener("click", () => {
  input.value = sample;
  analyze();
  document.querySelector("#message").textContent = "Sample loaded.";
});
document.querySelector(".card:last-of-type").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-tool]");
  if (!b) return;
  const text = input.value;
  if (b.dataset.tool === "upper") input.value = text.toUpperCase();
  if (b.dataset.tool === "lower") input.value = text.toLowerCase();
  if (b.dataset.tool === "reverse")
    input.value = Array.from(text).reverse().join("");
  if (b.dataset.tool === "copy") {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(
          () => (document.querySelector("#message").textContent = "Copied!"),
        )
        .catch(
          () =>
            (document.querySelector("#message").textContent =
              "Clipboard unavailable; copy manually."),
        );
    } else
      document.querySelector("#message").textContent =
        "Clipboard unavailable; copy manually.";
    return;
  }
  analyze();
  document.querySelector("#message").textContent = `Applied ${b.textContent}.`;
});
input.addEventListener("input", analyze);
analyze();
