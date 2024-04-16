import './style/style.css';
import $ from 'jquery';
import { request } from './service';

var notesData = [];

async function insert(data) {
    try {
        let response = await request("https://notes-api.dicoding.dev/v2/notes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.status == 'success') {
            console.log('Catatan berhasil ditambahkan:', data);
            return true;
        } else {
            console.error('Gagal menambahkan catatan:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error while inserting note:', error);
        return false;
    }
}


async function updateNoteById(id, newData) {
    let response = await request(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
    });
    console.log(response)

    if (response.status == 'success') {
        console.log(`Catatan dengan ID ${id} berhasil diperbarui`);
        return true; // Berhasil memperbarui catatan
    } else {
        console.error(`Gagal memperbarui catatan dengan ID ${id}`);
        return false; // Gagal memperbarui catatan
    }

    
}

async function deleteNoteById(id) {
    let response = await request(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    if (response.status == "success") {
        console.log(`Catatan dengan ID ${id} berhasil dihapus`);
        return true; // Berhasil menghapus catatan
    } else {
        console.error(`Gagal menghapus catatan dengan ID ${id}`);
        return false; // Gagal menghapus catatan
    }
}



class AppBar extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
      <header>
      
      <div style="display:flex; justify-content: space-between; margin: 17px;">
        <h2 style="color: #333;">Note Apps</h2>
        <h2><a href="#" style="text-decoration: none; color: #333;">Archived</a></h2>
      </div>

      </header>
      `;
    }
}
customElements.define("app-bar", AppBar);

class inputNote extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
      <form id="noteForm">
        <div class="input-label">
            <label>Judul :</label>
            <input id="title" type="text">    
        </div>
  
        <div class="input-label">
          <label >Isi :</label>
          <textarea id="body"></textarea>  
        </div>
  
        <button type="submit">Tambahkan Note</button>  
        <button style="background: green;">Archive</button>
         
      </form>
      `
    };
}
customElements.define('input-note', inputNote);

class footerElement extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
     
        <h3 style="color: #333; text-align: center;">Copyright Farhan Ferdiansyah Belajar Fundamental Front End</h3>
      `
    }
}
customElements.define('footer-element', footerElement);


function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

function generateID(prefix, length) {
    const randomString1 = generateRandomString(2);
    const randomString2 = generateRandomString(length);
    return `${prefix}-${randomString1}-${randomString2}`;
}

function addNote(title, body) {
    if (title.length > 10) {
        console.log("ERROR: Title tidak bisa lebih dari 10 karakter");
    }
    if (body.length > 500) {
        console.log("ERROR: Body tidak bisa lebih dari 500 karakter");
    }
    else {
        insert({
            title: title,
            body: body,
        })
    }
}

// Fungsi untuk menampilkan catatan
async function displayNotes() {
    let response = await request("https://notes-api.dicoding.dev/v2/notes").then(res => { return res })
    notesData = response.data

    const container = document.getElementById('noteContainer');
    container.innerHTML = '';
    notesData.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.id = note.id;

        // tambahkan HTML
        noteElement.innerHTML = `
        <div>
            <h1>${note.title}</h1>
            <br>
            <p>${note.body}</p>
            
            <button type="submit" id="btn1" style="background: red; color: #fff;">Hapus</button>
            <h4>Archive</h4>

        </div>
        `
        container.appendChild(noteElement);

    });
}

document.getElementById('title').addEventListener('input', function (event) {
    if (event.target.value.length > 10) {
        console.log("ERROR: Title tidak bisa lebih dari 10 karakter");
    }
})

document.getElementById('body').addEventListener('input', function (event) {
    if (event.target.value.length > 500) {
        console.log("ERROR: Body tidak bisa lebih dari 500 karakter");
    }
})

// Memanggil fungsi untuk menampilkan catatan saat halaman dimuat

document.addEventListener('DOMContentLoaded', function () {
    displayNotes();
});


// Menambahkan event listener untuk menambah catatan
document.getElementById('noteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const btn = document.getElementById('btn1')

    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");

            addNote(title, body);
            displayNotes();
            document.getElementById('title').value = '';
            document.getElementById('body').value = '';

        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});

// Menambahkan event listener untuk button Edit
document.getElementById('noteContainer').addEventListener('click', async function (event) {
    if (event.target.matches('#btn2')) {
        const noteElement = event.target.closest('.note');
        const noteId = noteElement.id;

        // Dapatkan data catatan yang ingin diperbarui
        const existingTitle = noteElement.querySelector('h1').textContent;
        const existingBody = noteElement.querySelector('p').textContent;

        // Tampilkan dialog untuk mengedit catatan
        const { value: formValues } = await Swal.fire({
            title: 'Edit Note',
            html:
                `<input id="swal-input1" class="swal2-input" value="${existingTitle}">` +
                `<textarea id="swal-input2" class="swal2-textarea">${existingBody}</textarea>`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ];
            }
        });

        // Jika pengguna menekan tombol "OK", lakukan pembaruan catatan
        if (formValues) {
            const [newTitle, newBody] = formValues;
            const success = await updateNoteById(noteId, { title: newTitle, body: newBody });
            
            if (success) {
                // Perbarui catatan di DOM jika berhasil memperbarui dari server
                noteElement.querySelector('h1').textContent = newTitle;
                noteElement.querySelector('p').textContent = newBody;
                Swal.fire(
                    'Updated!',
                    'Your note has been updated.',
                    'success'
                );
            } else {
                Swal.fire(
                    'Failed!',
                    'Failed to update the note. Please try again later.',
                    'error'
                );
            }
        }
    }
});



// Menambahkan event listener untuk button Hapus
document.getElementById('noteContainer').addEventListener('click', async function (event) {
    if (event.target.matches('#btn1')) {
        const noteElement = event.target.closest('.note');
        const noteId = noteElement.id;

        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this note!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmation.isConfirmed) {
            const success = await deleteNoteById(noteId);
            if (success) {
                noteElement.remove(); // Hapus catatan dari DOM jika berhasil dihapus dari server
                Swal.fire(
                    'Deleted!',
                    'Your note has been deleted.',
                    'success'
                );
            } else {
                Swal.fire(
                    'Failed!',
                    'Failed to delete the note. Please try again later.',
                    'error'
                );
            }
        }
    }
});
