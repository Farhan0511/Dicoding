// Data dummy catatan
const notesData = [
    {
      id: 'notes-jT-jjsyz61J8XKiI',
      title: 'Welcome to Notes, Dimas!',
      body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
      createdAt: '2022-07-28T10:03:12.594Z',
      archived: false,
    },
    {
      id: 'notes-aB-cdefg12345',
      title: 'Meeting Agenda',
      body: 'Discuss project updates and assign tasks for the upcoming week.',
      createdAt: '2022-08-05T15:30:00.000Z',
      archived: false,
    },
    {
      id: 'notes-XyZ-789012345',
      title: 'Shopping List',
      body: 'Milk, eggs, bread, fruits, and vegetables.',
      createdAt: '2022-08-10T08:45:23.120Z',
      archived: false,
    },
    {
      id: 'notes-1a-2b3c4d5e6f',
      title: 'Personal Goals',
      body: 'Read two books per month, exercise three times a week, learn a new language.',
      createdAt: '2022-08-15T18:12:55.789Z',
      archived: false,
    },
    {
      id: 'notes-LMN-456789',
      title: 'Recipe: Spaghetti Bolognese',
      body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
      createdAt: '2022-08-20T12:30:40.200Z',
      archived: false,
    },
    {
      id: 'notes-QwErTyUiOp',
      title: 'Workout Routine',
      body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
      createdAt: '2022-08-25T09:15:17.890Z',
      archived: false,
    },
    {
      id: 'notes-abcdef-987654',
      title: 'Book Recommendations',
      body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
      createdAt: '2022-09-01T14:20:05.321Z',
      archived: false,
    },
    {
      id: 'notes-zyxwv-54321',
      title: 'Daily Reflections',
      body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
      createdAt: '2022-09-07T20:40:30.150Z',
      archived: false,
    },
    {
      id: 'notes-poiuyt-987654',
      title: 'Travel Bucket List',
      body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
      createdAt: '2022-09-15T11:55:44.678Z',
      archived: false,
    },
    {
      id: 'notes-asdfgh-123456',
      title: 'Coding Projects',
      body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
      createdAt: '2022-09-20T17:10:12.987Z',
      archived: false,
    },
    {
      id: 'notes-5678-abcd-efgh',
      title: 'Project Deadline',
      body: 'Complete project tasks by the deadline on October 1st.',
      createdAt: '2022-09-28T14:00:00.000Z',
      archived: false,
    },
    {
      id: 'notes-9876-wxyz-1234',
      title: 'Health Checkup',
      body: 'Schedule a routine health checkup with the doctor.',
      createdAt: '2022-10-05T09:30:45.600Z',
      archived: false,
    },
    {
      id: 'notes-qwerty-8765-4321',
      title: 'Financial Goals',
      body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
      createdAt: '2022-10-12T12:15:30.890Z',
      archived: false,
    },
    {
      id: 'notes-98765-54321-12345',
      title: 'Holiday Plans',
      body: 'Research and plan for the upcoming holiday destination.',
      createdAt: '2022-10-20T16:45:00.000Z',
      archived: false,
    },
    {
      id: 'notes-1234-abcd-5678',
      title: 'Language Learning',
      body: 'Practice Spanish vocabulary for 30 minutes every day.',
      createdAt: '2022-10-28T08:00:20.120Z',
      archived: false,
    },
  ];
  
  class AppBar extends HTMLElement {
    constructor() {
      super();
  
      this.innerHTML = `
      <header>
      <h2 style="color: #333;">Note Apps</h2>
      
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
  
        <div> 
          <label>Archived</label>
          <input type="checkbox" id="checkbox" style="margin-left: 8px;">
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
  
  function addNote(title, body, archived) {
    if (title.length > 10) {
      console.log("ERROR: Title tidak bisa lebih dari 10 karakter");
    }
    if (body.length > 500) {
      console.log("ERROR: Body tidak bisa lebih dari 500 karakter");
    }
    else {
      notesData.push({
        id: generateID('notes', 10),
        title: title,
        body: body,
        archived: archived,
        createdAt: new Date().toISOString()
      });
    }
  }
  
  // Fungsi untuk menampilkan catatan
  function displayNotes() {
    const container = document.getElementById('noteContainer');
    container.innerHTML = '';
    notesData.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
  
      const titleElement = document.createElement('h1');
      titleElement.classList.add('note-title');
      titleElement.textContent = note.title;
  
      const bodyElement = document.createElement('p');
      bodyElement.classList.add('note-body');
      bodyElement.textContent = note.body;
  
      const archived = document.createElement('p');
      archived.textContent = `Status ${note.archived ? 'archived' : 'Not Archived'}`;
      archived.style = `margin-top: 10px; color:${note.archived ? 'green' : 'red'}; `;
  
      noteElement.appendChild(titleElement);
      noteElement.appendChild(bodyElement);
      noteElement.appendChild(archived)
  
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
    const checked = document.getElementById('checkbox').checked;
    console.log("kepanggil");
  
    addNote(title, body, checked);
    displayNotes();
    document.getElementById('title').value = '';
    document.getElementById('body').value = '';
    document.getElementById('checkbox').checked = false;
  });
  
  