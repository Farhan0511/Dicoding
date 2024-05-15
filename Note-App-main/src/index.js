import './style/style.css';
import { request } from './service';

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

async function archiveNote(id) {
    let response = await request(`https://notes-api.dicoding.dev/v2/notes/${id}/archive`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (response.status == 'success') {
        console.log(`Catatan dengan ID ${id} berhasil diarsip`);
        return true; // Berhasil mengarsip catatan
    } else {
        console.error(`Gagal mengarsip catatan dengan ID ${id}`);
        return false; // Gagal mengarsip catatan
    }
}

async function activeNote(id) {
    let response = await request(`https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (response.status == 'success') {
        console.log(`Catatan dengan ID ${id} berhasil diaktifkan`);
        return true; // Berhasil mengaktifkan catatan
    } else {
        console.error(`Gagal mengaktifkan catatan dengan ID ${id}`);
        return false; // Gagal mengaktifkan catatan
    }
}

async function getArchiveNote() {
    let response = await request(`https://notes-api.dicoding.dev/v2/notes/archived`)

    if (response.status == 'success') {
        return response.data;
    } else {
        return null;
    }
}

async function getActiveNote() {
    let response = await request(`https://notes-api.dicoding.dev/v2/notes`)
    
    if (response.status == 'success') {
        return response.data;
    } else {
        return null;
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
      </form>
      `
    };
}
customElements.define('input-note', inputNote);

class footerElement extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
     
        <h3 style="color: #333; text-align: center;">Copyright Farhan Ferdiansyah</h3>
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
            body: body
        })
    }
}

// Fungsi untuk menampilkan catatan
async function displayNotes() {
    const noteArchive = document.getElementById('noteArchive');
    const noteActive = document.getElementById('noteActive');
    noteArchive.innerHTML = "";
    noteActive.innerHTML = "";

    // Tampilkan loading sebelum fetching data
    const loadingArchive = document.createElement('div');
    loadingArchive.innerHTML = `
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    `
    noteArchive.appendChild(loadingArchive);

    const loadingActive = document.createElement('div');
    loadingActive.textContent = '';
    noteActive.appendChild(loadingActive);

    // Lakukan fetching data
    const responseArchive = await getArchiveNote();
    const responseActive = await getActiveNote();

    // Sembunyikan loading setelah mendapatkan respons dari server
    loadingArchive.style.display = "none";
    loadingActive.style.display = "none";

    // Lanjutkan dengan menampilkan data jika respons berhasil
    const noteActiveHead = document.createElement('h1');
    noteActiveHead.textContent = "Aktif";
    const noteArchiveHead = document.createElement('h1');
    noteArchiveHead.textContent = "Arsip";

    noteActive.append(noteActiveHead);
    noteArchive.append(noteArchiveHead);

    if (responseArchive != null) {
        responseArchive.map(function (data) {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.id = data.id;
            // tambahkan HTML
            noteElement.innerHTML = `
                <h1>${data.title}</h1>
                <br>
                <p>${data.body}</p>
                
                <button type="submit" id="btn1-archive" style="background: red; color: #fff;">Hapus</button>
                <button type="submit" id="btn2-archive" style="background: yellow; color: black;">Aktifkan</button>
                <h4 id="status">Status Arsip</h4>
            `    
            noteArchive.append(noteElement)
        })
    }
    if (responseActive != null) {
        responseActive.map(function (data) {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.id = data.id;
            // tambahkan HTML
            noteElement.innerHTML = `
                <h1>${data.title}</h1>
                <br>
                <p>${data.body}</p>
                
                <button type="submit" id="btn1-active" style="background: red; color: #fff;">Hapus</button>
                <button type="submit" id="btn2-active" style="background: yellow; color: black;">Arsipkan</button>
                <h4 id="status">Status Aktif</h4>
            `
            noteActive.append(noteElement)
        })
    }    
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

document.addEventListener('DOMContentLoaded', async function () {
    await displayNotes();
});


// Menambahkan event listener untuk menambah catatan
document.getElementById('noteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");

            addNote(title, body);
            await displayNotes();
            document.getElementById('title').value = '';
            document.getElementById('body').value = '';

        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});


document.getElementById('noteArchive').addEventListener("click", async function (event) {
    const noteElement = event.target.closest('.note');
    const noteId = noteElement.id;
    if (event.target.matches('#btn1-archive')) {
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
    } else if (event.target.matches('#btn2-archive')) {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will active this note',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, active it!'
        });

        if (confirmation.isConfirmed) {
            
            const response = await activeNote(noteId);
            if (response) {
                await displayNotes();
                Swal.fire(
                    'Actived!',
                    'Your note has been actived.',
                    'success'
                );
            } else {
                Swal.fire(
                    'Failed!',
                    'Failed to active the note. Please try again later.',
                    'error'
                );
            }
        }
    }
})

document.getElementById('noteActive').addEventListener('click', async function (event) {
    const noteElement = event.target.closest('.note');
    const noteId = noteElement.id;

    if (event.target.matches('#btn1-active')) {
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
    } else if (event.target.matches('#btn2-active')) {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will archive this note',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, archive it!'
        });

        if (confirmation.isConfirmed) {
            
            const response = await archiveNote(noteId);
            if (response) {
                await displayNotes();
                Swal.fire(
                    'Archived!',
                    'Your note has been archived.',
                    'success'
                );
            } else {
                Swal.fire(
                    'Failed!',
                    'Failed to archive the note. Please try again later.',
                    'error'
                );
            }
        }
    }
});
