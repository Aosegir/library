/* -- INITIALIZING VARIABLES -- */
// Initialize empty array that will store library books
const myLibrary = [];

/* -- DOM ELEMENTS -- */
// the div where the library books will be displayed with function displayLibrary
const libraryDisplay = document.getElementById('library-display');
// the button with the event listener to create a new Book object
const newBook = document.getElementById('new-book');
// the form newBook will display to add a new book with
const newBookDiv = document.getElementById('new-book-div');
// the submit button on the form
const submitForm = document.getElementById('submit-form');
// the following are the form inputs that must be checked upon submitting form
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const radioYes = document.getElementById('yes');

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
    // book pushed to array with relevant data
    myLibrary.push(new Book(title, author, pages, read));
    // once new book is added, display is updated
    displayLibrary();
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
    newBookDiv.classList.toggle('visible');
    newBookDiv.classList.toggle('invisible');
});

// event listener for submitForm button to prevent form from resetting page or acting
submitForm.addEventListener('click', submitFormClick);


function submitFormClick(event) {
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, radioYes.checked);
    event.preventDefault();
}

// dummy books added to fill library
addBookToLibrary('The Hobbit', 'JRR Tolkien', '295', false);
addBookToLibrary('Cat In The Hat', 'Dr Seuss', '50', true);
addBookToLibrary('To Flail Against Infinity', 'J. P. Valentine', '487', true);

// initial call to display dummy books
displayLibrary();