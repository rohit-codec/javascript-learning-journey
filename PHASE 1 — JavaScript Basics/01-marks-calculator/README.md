# Student Marks & Grade Calculator

A beginner-friendly JavaScript project that calculates a student's total marks, percentage, grade, and pass/fail result for five subjects.

## Features
- Enter a student name and marks for five subjects.
- Calculate total marks out of 500 and percentage.
- Assign a grade based on the percentage.
- Check pass/fail using a minimum of 33 marks in every subject.
- Validate missing, out-of-range, and non-integer marks.
- Show a performance message and progress bar.
- Clear the form and results.
- Responsive layout for desktop and mobile.

## Technologies
- HTML5
- CSS3
- Vanilla JavaScript

## Project structure
```text
01-marks-calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to run
1. Download or clone the project.
2. Open the folder in VS Code.
3. Open `index.html` in a browser, or use the Live Server extension.
4. Enter a name and a whole-number mark from 0 to 100 for every subject.
5. Click **Calculate result**.

No package installation or build step is required.

## Grade rules
| Percentage | Grade |
|---:|:---|
| 90–100% | A+ |
| 80–89.99% | A |
| 70–79.99% | B |
| 60–69.99% | C |
| 50–59.99% | D |
| 33–49.99% | E |
| Below 33% | F |

A student passes only if every subject has at least 33 marks. The grade is based on the percentage, while pass/fail also checks each subject individually.

## JavaScript concepts practiced
- Variables and constants
- Type conversion with `Number()`
- Conditions and functions
- Arrays and `for...of`
- `reduce()` and `every()`
- DOM selection and updates
- Form submit/reset events and `preventDefault()`
- Input validation and `try...catch`
- Template literals
- Dynamic CSS classes and styles

## Possible improvements
- Add a subject-wise marks breakdown.
- Allow adding or removing subjects.
- Save previous calculations with LocalStorage.
- Add print or download-result options.
- Write tests for grade and validation logic.

## Learning note
This is a practice project. Change the grade boundaries and passing criteria to match your institution's rules.
