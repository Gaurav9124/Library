console.log("hello");

const Modal = document.getElementById("modal");
const addButton = document.getElementById("add-book");
const closeModal = document.getElementById("submit-close-modal");
const card = document.createElement("div");
const libraryGrid = document.querySelector(".library-grid");
card.innerText = "";
let library = [];
console.log(Modal);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(newBook) {
  library.push(newBook);
}

function resetModalForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("status").checked = false;
}

addButton.addEventListener("click", function () {
  Modal.showModal();
});

closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let status = document.getElementById("status").checked;
  const newBook = new Book(title, author, pages, status);
  addBookToLibrary(newBook);
  displayBook();
  resetModalForm();
  console.log(`Library: ${library}`);
  Modal.close();
});


function displayBook() {
  const bookIndex = library.length - 1;
  const bookCard = document.createElement("div");
  const deleteCard = document.createElement("button");
  const toggleRead = document.createElement("button");

  deleteCard.innerText = "Delete";
  deleteCard.style.padding = "1em";
  deleteCard.setAttribute("class", "deleteCardButton");

  toggleRead.innerText = "Toggle read";
  toggleRead.style.padding = "1em";
  toggleRead.setAttribute("class", "toggleReadButton");

  bookCard.innerHTML = `
    <p>Title : ${library[bookIndex].title} </p>
    <p>Author : ${library[bookIndex].author} </p>
    <p>Pages : ${library[bookIndex].pages} </p>
    <p>Completed : ${library[bookIndex].read}</p>
  `;

  bookCard.appendChild(toggleRead);
  bookCard.appendChild(deleteCard);

  bookCard.setAttribute("class", "bookCard");
  bookCard.setAttribute("data-index", bookIndex);
  bookCard.style.height = "300px";
  bookCard.style.padding = "2em";
  bookCard.style.borderRadius = "10px";
  bookCard.style.border = "1px solid black";

  toggleRead.addEventListener("click", () => {
    library[bookIndex].read = !library[bookIndex].read;
    bookCard.querySelector(
      "p:nth-child(4)"
    ).innerText = `Completed : ${library[bookIndex].read}`;
  });

  deleteCard.addEventListener("click", () => {
    library.splice(bookIndex, 1);
    bookCard.remove();
  });

  libraryGrid.appendChild(bookCard);
}
