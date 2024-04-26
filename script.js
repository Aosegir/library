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
const radioNo = document.getElementById('no');

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

// dummy books added to fill library
addBookToLibrary('The Hobbit', 'JRR Tolkien', '295', false);
addBookToLibrary('Cat In The Hat', 'Dr Seuss', '50', true);
addBookToLibrary('To Flail Against Infinity', 'J. P. Valentine', '487', true);

// Function that will display contents of library in libraryDisplay div when called
function displayLibrary() {

    // while loop clears divs so that books are not repeated with multiple calls of function
    while(libraryDisplay.firstChild) {
        libraryDisplay.removeChild(libraryDisplay.lastChild);
    }

    // variable will serve as the current index of the myLibrary array
    let index = 0;
    
    // loop through each Book object in myLibary array
    myLibrary.forEach((book) => {
        // div that holds book data: init, add class for CSS
        const newDiv = document.createElement("div");
        newDiv.classList.add('book-display');

        // will loop through each property in the book
        for(property in book) {
            // p element with data: init, set html, append
            const newText = document.createElement("p");
            newText.innerHTML = `${property}: ${book[property]}`;
            newDiv.appendChild(newText);
        };
        // button that removes book: init, set attribute, html, function, append
        const removeBook = document.createElement('button');
        removeBook.setAttribute('index', index);
        removeBook.innerHTML = 'Remove Book';
        removeBookFunction(removeBook);
        newDiv.appendChild(removeBook);

        // button that toggles read status: init, set attribute, html, function, append
        const readButton = document.createElement('button');
        readButton.setAttribute('index', index);
        readButton.innerHTML = 'Toggle Read';
        toggleReadStatus(readButton);
        newDiv.appendChild(readButton);

        // increment index
        index++;

        // append div to main display for visibility
        libraryDisplay.append(newDiv);
    });
};


// event listener will add book to myLibrary array
newBook.addEventListener('click', () => {
    newBookDiv.classList.toggle('visible');
    newBookDiv.classList.toggle('invisible');
});

// event listener for submitForm button to prevent form from resetting page or acting
submitForm.addEventListener('click', submitFormClick);

// function is added separately from event listener to provide event.preventDefault
function submitFormClick(event) {
    // adding book to library using available data, only need to check one radio
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, radioYes.checked);
    // resetting values without using form.reset(), which would reload the page
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    radioYes.checked = false;
    radioNo.checked = false;
    // event.preventDefault() stops page from reloading
    event.preventDefault();
};

// function will add event listener to remove book and is called every time library is displayed
function removeBookFunction(button) {
    button.addEventListener('click', () => {
        console.log(libraryDisplay);
        // removes book from myLibrary array at correct index
        myLibrary.splice(button.getAttribute('index'), 1);
        // redisplay library with updated array
        displayLibrary();
    });
};

// function will toggle read status of book
function toggleReadStatus(button) {
    button.addEventListener('click', () => {
        // if book's read status = true, set to false - else, set to true
        if(myLibrary[button.getAttribute('index')].read) {
            myLibrary[button.getAttribute('index')].read = false;
        } else {
            myLibrary[button.getAttribute('index')].read = true;
        }
        // redisplay library with updated data
        displayLibrary();
    });
};