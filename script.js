const modal = document.getElementById("modal");
const addBook = document.getElementById("addbook");
const cancelMOdal = document.getElementById("cancelinfo");
const submitModal = document.getElementById("submitinfo");
const container = document.getElementById("container");
const form = document.getElementById("addbookform");

let bookName = document.getElementById("book");
let authorName = document.getElementById("author");
let pagesInBook = document.getElementById("pages");
let readStatus = document.getElementById("readstatus");

let libraryCollection = [];

addBook.addEventListener("click", () => {
  modal.showModal();
});

cancelMOdal.addEventListener("click", (e) => {
  e.preventDefault();
  clearModalInputs();
  modal.close();
});

submitModal.addEventListener("click", (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    addBookToLibrary();
    createCard();
    modal.close();
  } else {
    alert("all details are required");
  }
});

class Book {
  constructor(book, author, pages, readStauts) {
    this.book = book;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStauts;
  }

  displayBook() {
    console.log(`book : ${this.book},
                author : ${this.author},
                pages : ${this.author},
                read? : ${this.readStatus}`);
  }
}

function addBookToLibrary() {
  let newBook = new Book(
    bookName.value,
    authorName.value,
    pagesInBook.value,
    readStatus.checked
  );
  console.log(
    bookName.value,
    authorName.value,
    pagesInBook.value,
    readStatus.checked
  );

  libraryCollection.push(newBook);
  clearModalInputs();
}

function deleteBookfromLibrary(){
  
}

function clearModalInputs() {
  bookName.value = "";
  authorName.value = "";
  pagesInBook.value = "";
  readStatus.checked = false;
}

function createCard() {
  let currentBook = libraryCollection[libraryCollection.length - 1];
  const bookCard = document.createElement("div");
  bookCard.style.backgroundColor = "white";
  bookCard.style.display = "flex";
  bookCard.style.flexDirection = "column";
  bookCard.style.alignItems = "center";
  bookCard.style.justifyContent = "center";
  bookCard.style.boxSizing = "borderbox";

  const bookCardName = document.createElement("p");
  bookCardName.textContent = `'${currentBook.book}'`;
  bookCard.appendChild(bookCardName);

  const bookCardAuthor = document.createElement("p");
  bookCardAuthor.textContent = `-by ${currentBook.author}.`;
  bookCard.appendChild(bookCardAuthor);

  const bookCardPages = document.createElement("p");
  bookCardPages.textContent = `Number of pages : ${currentBook.pages}`;
  bookCard.appendChild(bookCardPages);

  const bookCardReadStatus = document.createElement("button");
  bookCardReadStatus.textContent = `${currentBook.readStatus}`;
  bookCardReadStatus.setAttribute("class", "bookreadstatus");

  bookCard.appendChild(bookCardReadStatus);

  const bookCardDelete = document.createElement("button");
  bookCardDelete.textContent = "DELETE";

  bookCardDelete.addEventListener("click", () => {
    libraryCollection.pop();
    bookCard.remove();
  });

  bookCard.appendChild(bookCardDelete);

  container.appendChild(bookCard);
}
