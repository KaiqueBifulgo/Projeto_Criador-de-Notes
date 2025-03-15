// ELEMENTOS
const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");

const addNoteBtn = document.querySelector(".add-note");



// FUNÇÕES
function showNotes() {
    cleanNotes();


    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed)

        notesContainer.appendChild(noteElement)
    })
}

function cleanNotes() {
    notesContainer.replaceChildren([]);
}


function addNote() {

    const notes = getNotes();

    const noteObject = {
        id: generateId(),
        content: noteInput.value,
        fixed: false,
    }

    const noteElement = createNote(noteObject.id, noteInput.value)

    notesContainer.appendChild(noteElement);

    notes.push(noteObject);

    saveNotes(notes);

    noteInput.value = "";
}

function generateId () {
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {

    const element = document.createElement("div");

    element.classList.add("note");

    const textArea = document.createElement("textarea");

    textArea.value = content;
    
    textArea.placeholder = "Adicione uma nota...";

    element.appendChild(textArea);

    const fixedIcon = document.createElement("i");

    fixedIcon.classList.add(...["bi", "bi-pin"]);

    element.appendChild(fixedIcon);
    

    if (fixed) {
        element.classList.add("fixed");
    }


    // EVENTOS DO ELEMENTO
    element.querySelector(".bi-pin").addEventListener("click", () => {
        toggleFixNote(id);
    })

    return element;


}

function toggleFixNote(id) {
    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.fixed = !targetNote.fixed;

    saveNotes(notes);

    showNotes();
}

// LOCALSTORAGE
function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const ordemNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

    return ordemNotes;
}


function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}



// EVENTOS
addNoteBtn.addEventListener("click", () => addNote());



// INICIALIZAÇÃO
showNotes();