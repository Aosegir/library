/* -- INITIALIZING VARIABLES -- */
// Initialize empty array that will store library books
const myLibrary = [];

/* -- DOM ELEMENTS -- */
// the div where the library books will be displayed with function displayLibrary
const libraryDisplay = document.getElementById('library-display');
// the button with the event listener to create a new Book object
const newBook = document.getElementById('new-book');

/* Object Constructor for book
    title = string;
    author = string;
    pages = num;
    read = boolean;
*/
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Function will append a new book object to myLibrary array when called
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

// Function that will display contents of library in libraryDisplay div when called
function displayLibrary() {

    // while loop clears divs so that books are not repeated with multiple calls of function
    while(libraryDisplay.firstChild) {
        libraryDisplay.removeChild(libraryDisplay.lastChild);
    }

    // loop through each Book object in myLibary array
    myLibrary.forEach((book) => {
        // dummy div is created - will need to implement id for removal later
        const newDiv = document.createElement("div");
        // class added for visibilty via CSS
        newDiv.classList.add('book-display');
        // will loop through each property in the book
        for(property in book) {
            // paragraph element to display property data
            const newText = document.createElement("p");
            // setting paragraph element to display the current key value pair of property
            newText.innerHTML = `${property}: ${book[property]}`;
            // append text paragraph to dummy div
            newDiv.appendChild(newText);
        };
        // append dummy div to main display for visibility
        libraryDisplay.append(newDiv);
    });
}


// event listener will add book to myLibrary array
newBook.addEventListener('click', () => {
    // following four prompts will allow the user to fill out book data
    let title = prompt("What is the title of the book?");
    let author = prompt(`What is the name of the author of ${title}?`);
    let pages = prompt(`How many pages is ${title}?`);
    let read = prompt(`Please answer the following statement with either 'true' or 'false': 'I have read ${title}'.`);
    // function called adds book to library array
    addBookToLibrary(title, author, pages, read);
    // library display is updated with new book
    displayLibrary();
});

// dummy books added to fill library
addBookToLibrary('The Hobbit', 'JRR Tolkien', '295', false);
addBookToLibrary('Cat In The Hat', 'Dr Seuss', '50', true);
addBookToLibrary('To Flail Against Infinity', 'J. P. Valentine', '487', true);

// initial call to display dummy books
displayLibrary();