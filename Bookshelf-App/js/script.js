
// Fungsi untuk mendapatkan data buku dari local storage
function getBooksFromStorage() {
    const booksString = localStorage.getItem('books');
    return JSON.parse(booksString) || [];
}

// Fungsi untuk menyimpan data buku ke local storage
function saveBooksToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

// Fungsi untuk menampilkan buku pada rak yang sesuai
function renderBooks() {
    const unfinishedBooksList = document.getElementById('unfinishedBooks');
    const finishedBooksList = document.getElementById('finishedBooks');
    unfinishedBooksList.innerHTML = '';
    finishedBooksList.innerHTML = '';

    const books = getBooksFromStorage();
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} - ${book.author} (${book.year})`;
        const moveButton = document.createElement('button');
        moveButton.textContent = book.isComplete ? 'Pindahkan ke Belum Selesai Dibaca' : 'Pindahkan ke Selesai Dibaca';
        moveButton.addEventListener('click', () => {
            book.isComplete = !book.isComplete;
            saveBooksToStorage(books);
            renderBooks();
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.addEventListener('click', () => {
            const index = books.indexOf(book);
            if (index !== -1) {
                books.splice(index, 1);
                saveBooksToStorage(books);
                renderBooks();
            }
        });
        li.appendChild(moveButton);
        li.appendChild(deleteButton);

        if (book.isComplete) {
            finishedBooksList.appendChild(li);
        } else {
            unfinishedBooksList.appendChild(li);
        }
    });
}

// Fungsi untuk menambahkan buku baru
function addBook(title, author, year, isComplete) {
    const books = getBooksFromStorage();
    const newBook = {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    };
    books.push(newBook);
    saveBooksToStorage(books);
    renderBooks();
}

// Event listener untuk form penambahan buku
const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const isComplete = document.getElementById('isComplete').checked;
    const date = new Date(year);
    const dataYear = date.getFullYear();
    addBook(title, author, dataYear, isComplete);
    bookForm.reset();    
});


document.addEventListener('DOMContentLoaded', function () {
    // Memanggil fungsi renderBooks saat halaman dimuat
    renderBooks();
});
