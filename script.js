const my_library = []
const form = document.querySelector("form.new-book");
const add_dialog = document.querySelector("dialog.new-book");
const book_table_div = document.querySelector(".book-table");

function Book(name, author) {
    if (!new.target) {
        throw Error("new not used");
    }
    this.name = name;
    this.author = author;
}

const keys = ["id", "name", "author"];

function add_book_to_lib(name, author) {
    my_library.push({ id: crypto.randomUUID(), book: new Book(name, author), });
}

function print_books() {
    const old_table = document.querySelector(".book-table > table");
    if(old_table) {
        book_table_div.removeChild(old_table);
    }
    const table = document.createElement("table");
    new_table_header(table);
    const tbody = document.createElement("tbody");
    my_library.forEach((v) => new_book_row(tbody, { id: v.id, ...v.book }));
    table.appendChild(tbody);
    book_table_div.append(table);
}

function new_table_header(table) {
    const thead = document.createElement("thead");
    keys.forEach((v) => {
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
    const td_del = document.createElement("td");
    const btn_del = document.createElement("button");
    btn_del.classList.add("btn-del");
    btn_del.textContent = "DEL";
    btn_del.setAttribute("data-book-id", book.id);
    td_del.appendChild(btn_del);
    tr.appendChild(td_del);

    tbody.appendChild(tr);
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
    const print_btn = document.querySelector("button.print-books");
    print_btn.addEventListener("click", () => { print_books(); })
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
    book_table_div.addEventListener('click', (e)=> {
        if([...e.target.classList].includes("btn-del"))
        {
            const id = e.target.getAttribute("data-book-id");
            my_library.splice(my_library.findIndex((v) => v.id === id), 1);
        }
    })
}

document.addEventListener("DOMContentLoaded", () => { init(); })