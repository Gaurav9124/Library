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
    render();
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

function deleteBookfromLibrary(n) {
  libraryCollection.splice(n - 1, 1);
}

function clearModalInputs() {
  bookName.value = "";
  authorName.value = "";
  pagesInBook.value = "";
  readStatus.checked = false;
}

function render() {
  container.innerHTML = "";
  libraryCollection.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.style.display = "flex";
    bookCard.style.flexDirection = "column";
    bookCard.style.alignItems = "center";
    bookCard.style.justifyContent = "space-evenly";
    bookCard.style.boxSizing = "border-box";
    bookCard.style.backgroundColor = '#1E1E1E' ;
    bookCard.style.borderRadius="20px";

    const bookCardName = document.createElement("p");
    bookCardName.textContent = `'${book.book}'`;
    bookCardName.style.fontFamily="Viaoda Libre";
    bookCardName.style.fontSize = "2em";
    bookCardName.style.fontWeight = "bold";
    bookCardName.style.color="white";
    bookCardName.style.margin = "0";
    bookCard.appendChild(bookCardName);

    const bookCardAuthor = document.createElement("p");
    bookCardAuthor.textContent = `-by ${book.author}`;
    bookCardAuthor.style.fontFamily="Viaoda Libre";
    bookCardAuthor.style.fontWeight="600";
    bookCardAuthor.style.fontSize="1.2em";
    bookCardAuthor.style.color="white";
    bookCardAuthor.style.margin = "0";
    bookCard.appendChild(bookCardAuthor);

    const bookCardPages=document.createElement("p");
    bookCardPages.textContent=`Number of Pages : ${book.pages}`;
    bookCardPages.style.fontFamily="Viaoda Libre";
    bookCardPages.style.color="white";
    bookCardPages.style.margin="none";
    bookCard.appendChild(bookCardPages);

    const toggleRead = document.createElement("button");
    toggleRead.style.width = "100%";
    toggleRead.style.height = "3em";
    toggleRead.style.border="none";
    toggleRead.style.color="white";
    toggleRead.style.fontWeight="600";
    toggleRead.style.fontFamily="Viaoda Libre";
    toggleRead.textContent = book.readStatus ? "COMPLETED" : "NOT COMPLETED";
    toggleRead.style.backgroundColor = book.readStatus ? "#4CAF50 " : " #FFC107";
    toggleRead.addEventListener("click", () => {
      libraryCollection[index].readStatus =
        !libraryCollection[index].readStatus;
      render();
    });
    bookCard.appendChild(toggleRead);

    const deleteCard = document.createElement("button");
    deleteCard.textContent = "REMOVE";
    deleteCard.style.height = "3em";
    deleteCard.style.width = "100%";
    deleteCard.style.border = "none";
    deleteCard.style.fontFamily="Viaoda Libre";
    deleteCard.style.fontWeight="600";
    deleteCard.style.color = "white";
    deleteCard.style.backgroundColor = " #F44336 ";
    deleteCard.addEventListener("click", () => {
      libraryCollection.splice(index, 1);
      render();
    });
    bookCard.appendChild(deleteCard);

    container.appendChild(bookCard);
  });
}
