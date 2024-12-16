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
  const bookCard = document.createElement("div");
  bookCard.innerHTML = `<p>Title : ${library[library.length - 1].title} </p>`;
  bookCard.innerHTML += `<p>Author : ${library[library.length - 1].author} </p>`;
  bookCard.innerHTML += `<p>Pages : ${library[library.length - 1].pages} </p>`;
  bookCard.innerHTML += `<p>Completed : ${library[library.length - 1].read}</p>`;
  // bookCard.style.fontFamily="old Standard TT, serif";
  // bookCard.style.boxSizing="borderBox";
  // bookCard.style.fontSize="32px";
  // bookCard.style.overflow="scroll";
  bookCard.setAttribute("class", "bookCard");
  bookCard.style.height = "300px";
  bookCard.style.padding = "2em";
  bookCard.style.borderRadius = "10px";
  bookCard.style.border = "1px solid black";
  libraryGrid.appendChild(bookCard);
}
