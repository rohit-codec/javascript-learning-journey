let seconds = 25 * 60,
  timer = null;
const output = document.querySelector("#time");
function render() {
  output.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}
document.querySelector("#start").onclick = () => {
  if (timer !== null) return;
  document.querySelector("#status").textContent = "Timer running";
  timer = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      render();
    } else {
      clearInterval(timer);
      timer = null;
      document.querySelector("#status").textContent = "Session complete!";
    }
  }, 1000);
};
document.querySelector("#pause").onclick = () => {
  clearInterval(timer);
  timer = null;
  document.querySelector("#status").textContent = "Paused";
};
document.querySelector("#reset").onclick = () => {
  clearInterval(timer);
  timer = null;
  seconds = 25 * 60;
  document.querySelector("#status").textContent = "Reset";
  render();
};
render();
