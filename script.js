const my_library = []
const form = document.querySelector("form.new-book");
const add_dialog = document.querySelector("dialog.new-book");
const book_table_body = document.querySelector(".book-table > tbody");

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
    my_library.forEach((v)=> new_book_row({ id: v.id, ...v.book }));
}

function new_book_row(book) {
    const tr = document.createElement("tr");
    Object.keys(book).forEach(key => {
        const td = document.createElement("td");
        td.textContent = book[key];
        tr.appendChild(td);
    })
    book_table_body.appendChild(tr);
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
    const add_btn = document.querySelector("button.new-book");
    add_btn.addEventListener("click", () => {
        add_dialog.showModal();
    })
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        add_book_to_lib(data.get("name"), data.get("author"));
        add_dialog.close();
    })
}

document.addEventListener("DOMContentLoaded", () => { init(); })