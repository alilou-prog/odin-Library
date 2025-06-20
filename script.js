const my_library = []

function Book(name, author) {
    if (!new.target) {
        throw Error("new not used");
    }
    this.name = name;
    this.author = author;
}

function add_book_to_lib(name, author) {
    my_library.push({ id: crypto.randomUUID(), book: new Book(name, author), });
}

function print_books() {
    console.table(my_library.map((v)=>{return {id: v.id, ...v.book}}));
}

function feed() {
    add_book_to_lib("book1", "author1");
    add_book_to_lib("book2", "author2");
    add_book_to_lib("book3", "author3");
    add_book_to_lib("book4", "author4");
    add_book_to_lib("book5", "author5");
}

function init() {
    feed();
}

document.addEventListener("DOMContentLoaded", ()=>{init();})