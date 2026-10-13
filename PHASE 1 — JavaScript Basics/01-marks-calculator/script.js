const marksForm = document.querySelector("#marks-form");
const studentNameInput = document.querySelector("#student-name");
const errorMessage = document.querySelector("#error-message");
const resultCard = document.querySelector("#result-card");

const subjects = [
  { id: "maths", name: "Mathematics" },
  { id: "science", name: "Science" },
  { id: "english", name: "English" },
  { id: "computer", name: "Computer" },
  { id: "social-science", name: "Social Science" }
];

const PASS_MARKS = 33;
const MAX_MARKS = subjects.length * 100;

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  if (percentage >= 33) return "E";
  return "F";
}

function readMarks() {
  const marks = [];

  for (const subject of subjects) {
    const input = document.querySelector(`#${subject.id}`);
    const rawValue = input.value.trim();

    if (rawValue === "") {
      throw new Error(`Please enter marks for ${subject.name}.`);
    }

    const mark = Number(rawValue);

    if (!Number.isFinite(mark) || mark < 0 || mark > 100) {
      throw new Error(`${subject.name} marks must be between 0 and 100.`);
    }

    if (!Number.isInteger(mark)) {
      throw new Error(`${subject.name} marks must be a whole number.`);
    }

    marks.push(mark);
  }

  return marks;
}

function getFeedback(name, percentage, passed) {
  if (!passed) {
    return `${name}, you need at least ${PASS_MARKS} marks in every subject to pass. Keep practicing!`;
  }
  if (percentage >= 90) return `Excellent work, ${name}! Your performance is outstanding.`;
  if (percentage >= 75) return `Great job, ${name}! You have performed very well.`;
  if (percentage >= 50) return `Good effort, ${name}. Keep revising to improve your score.`;
  return `You passed, ${name}. More practice can help you improve further.`;
}

function displayResult(name, marks) {
  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const percentage = (total / MAX_MARKS) * 100;
  const grade = getGrade(percentage);
  const passed = marks.every((mark) => mark >= PASS_MARKS);

  document.querySelector("#result-name").textContent = name;
  document.querySelector("#total-marks").textContent = `${total} / ${MAX_MARKS}`;
  document.querySelector("#percentage").textContent = `${percentage.toFixed(2)}%`;
  document.querySelector("#grade").textContent = grade;
  document.querySelector("#progress-text").textContent = `${percentage.toFixed(2)}%`;
  document.querySelector("#progress-bar").style.width = `${percentage}%`;
  document.querySelector("#progress-track").setAttribute("aria-valuenow", percentage.toFixed(2));
  document.querySelector("#result-message").textContent = getFeedback(name, percentage, passed);

  const badge = document.querySelector("#result-badge");
  badge.textContent = passed ? "PASS" : "FAIL";
  badge.classList.toggle("fail", !passed);
  resultCard.classList.remove("hidden");
}

function showError(message) {
  errorMessage.textContent = message;
}

marksForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showError("");

  const name = studentNameInput.value.trim();

  if (name === "") {
    showError("Please enter the student's name.");
    studentNameInput.focus();
    resultCard.classList.add("hidden");
    return;
  }

  try {
    displayResult(name, readMarks());
  } catch (error) {
    showError(error.message);
    resultCard.classList.add("hidden");
  }
});

marksForm.addEventListener("reset", () => {
  showError("");
  resultCard.classList.add("hidden");
  document.querySelector("#progress-bar").style.width = "0";
  document.querySelector("#progress-track").setAttribute("aria-valuenow", "0");
});
