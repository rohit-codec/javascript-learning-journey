class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.issued = false;
  }
  toggle() {
    this.issued = !this.issued;
  }
}
const books = [];
const form = document.querySelector("#form");
function render() {
  const list = document.querySelector("#list");
  list.replaceChildren();
  books.forEach((book, i) => {
    const li = document.createElement("li");
    li.textContent = `${book.title} — ${book.author} (${book.issued ? "Issued" : "Available"}) `;
    const b = document.createElement("button");
    b.textContent = book.issued ? "Return" : "Issue";
    b.onclick = () => {
      book.toggle();
      render();
    };
    const d = document.createElement("button");
    d.textContent = "Delete";
    d.onclick = () => {
      books.splice(i, 1);
      render();
    };
    li.append(b, d);
    list.append(li);
  });
}
form.onsubmit = (e) => {
  e.preventDefault();
  books.push(
    new Book(
      document.querySelector("#title").value.trim(),
      document.querySelector("#author").value.trim(),
    ),
  );
  form.reset();
  render();
};
render();
