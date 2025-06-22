const Library = (function () {
    const books = []
    const add_form = document.querySelector("form.new-book");
    const add_dialog = document.querySelector("dialog.new-book");
    const book_table_div = document.querySelector(".book-table");
    return { books, add_form, add_dialog, book_table_div };
})()

function Book(name, author, is_read) {
    if (!new.target) {
        throw Error("new not used");
    }
    this.name = name;
    this.author = author;
    this.is_read = is_read;
}

const Library_ui = (function () {
    const keys = ["id", "name", "author", "is_read"];
    const btns = [{ label: "Delete", class: "btn-del" }, { label: "set is_read", class: "btn-is-read" }];
    const cols = keys.concat(btns.map((v) => v.label));
    return {keys, btns, cols};
})()

function add_book_to_lib(name, author, is_read) {
    const book = new Book(name, author, is_read);
    Library.books.push({ id: crypto.randomUUID(), ...book });
    print_books();
}

function print_books() {
    const old_table = document.querySelector(".book-table > table");
    if (old_table) {
        Library.book_table_div.removeChild(old_table);
    }
    const table = document.createElement("table");
    new_table_header(table);
    const tbody = document.createElement("tbody");
    Library.books.forEach((v) => new_book_row(tbody, v));
    table.appendChild(tbody);
    Library.book_table_div.append(table);
}

function new_table_header(table) {
    const thead = document.createElement("thead");
    Library_ui.cols.forEach((v) => {
        const th = document.createElement("th");
        th.textContent = v;
        thead.appendChild(th);
    })
    table.appendChild(thead);
}

function new_book_row(tbody, book) {
    const tr = document.createElement("tr");
    Object.keys(book).forEach(key => {
        const td = document.createElement("td");
        td.textContent = book[key];
        tr.appendChild(td);
    })
    Library_ui.btns.forEach((btn_data) => {
        const td = document.createElement("td");
        const btn = document.createElement("button");
        btn.classList.add(btn_data.class);
        btn.textContent = btn_data.label;
        btn.setAttribute("data-book-id", book.id);
        td.appendChild(btn);
        tr.appendChild(td);
    })

    tbody.appendChild(tr);
}

function feed() {
    add_book_to_lib("book1", "author1", true);
    add_book_to_lib("book2", "author2", false);
    add_book_to_lib("book3", "author3", true);
    add_book_to_lib("book4", "author4", true);
    add_book_to_lib("book5", "author5", false);
}


function init() {
    feed();
    const print_btn = document.querySelector("button.print-books");
    print_btn.addEventListener("click", () => { print_books(); })
    const add_btn = document.querySelector("button.new-book");
    add_btn.addEventListener("click", () => {
        Library.add_dialog.showModal();
    })
    Library.add_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        add_book_to_lib(data.get("name"), data.get("author"));
        Library.add_dialog.close();
    })
    Library.book_table_div.addEventListener('click', (e) => {
        target_classes = [...e.target.classList]
        if (target_classes.includes("btn-del")) {
            const id = e.target.getAttribute("data-book-id");
            Library.books.splice(Library.books.findIndex((v) => v.id === id), 1);
            print_books();
        }
        else if (target_classes.includes("btn-is-read")) {
            const id = e.target.getAttribute("data-book-id");
            let book = Library.books.find((v) => v.id === id);
            book.is_read = !book.is_read;
            print_books();
        }
    })
}

document.addEventListener("DOMContentLoaded", () => { init(); })