const questions = [
  {
    q: "Which keyword is block-scoped?",
    a: ["var", "let", "echo"],
    correct: 1,
  },
  {
    q: "Which array method returns a new transformed array?",
    a: ["map()", "pop()", "push()"],
    correct: 0,
  },
  {
    q: "Which event fires when a form is submitted?",
    a: ["submit", "hover", "loadData"],
    correct: 0,
  },
];
let index = 0,
  score = 0;
const root = document.querySelector("#quiz");
function render() {
  root.replaceChildren();
  if (index === questions.length) {
    const h = document.createElement("h2");
    h.textContent = `Quiz complete: ${score}/${questions.length}`;
    const b = document.createElement("button");
    b.textContent = "Restart";
    b.onclick = () => {
      index = 0;
      score = 0;
      render();
    };
    root.append(h, b);
    return;
  }
  const q = questions[index],
    h = document.createElement("h2");
  h.textContent = `${index + 1}. ${q.q}`;
  root.append(h);
  q.a.forEach((answer, i) => {
    const b = document.createElement("button");
    b.textContent = answer;
    b.onclick = () => {
      if (i === q.correct) score++;
      index++;
      render();
    };
    root.append(b);
  });
}
render();
