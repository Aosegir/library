const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

const libraryDisplay = document.getElementById('library-display');

function displayLibrary() {
    myLibrary.forEach((book) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add('book-display');
        for(property in book) {
            const newText = document.createElement("p");
            newText.innerHTML = `${property}: ${book[property]}`;
            newDiv.appendChild(newText);
        };
        libraryDisplay.append(newDiv);
    });
}


addBookToLibrary('The Hobbit', 'JRR Tolkien', '295', false);
addBookToLibrary('Cat In The Hat', 'Dr Seuss', '50', true);
addBookToLibrary('To Flail Against Infinity', 'J. P. Valentine', '487', true);

displayLibrary();