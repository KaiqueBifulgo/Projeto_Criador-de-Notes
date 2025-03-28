// ELEMENTOS
const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");

const addNoteBtn = document.querySelector(".add-note");

const searchInput = document.querySelector("#search-input");

const exportBtn = document.querySelector("#export-notes");



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

    // BOTAO FIXAR
    const fixedIcon = document.createElement("i");

    fixedIcon.classList.add(...["bi", "bi-pin"]);

    element.appendChild(fixedIcon);

    // BOTAO DELETE
    const deleteIcon = document.createElement("i");

    deleteIcon.classList.add(...["bi", "bi-x-lg"]);

    element.appendChild(deleteIcon);

    // BOTAO DUPLICAR
    const duplicateIcon = document.createElement("i");

    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"])

    element.appendChild(duplicateIcon);
    

    if (fixed) {
        element.classList.add("fixed");
    }


    // EVENTOS DO ELEMENTO
    element.querySelector("textarea").addEventListener("keyup", (e) => {

        const noteContent = e.target.value;

        updateNote(id, noteContent);
    })

    // EVENTO DE FIXAR
    element.querySelector(".bi-pin").addEventListener("click", () => {
        fixNote(id);
    })

    // EVENTO DE DELETAR
    element.querySelector(".bi-x-lg").addEventListener("click", () => {
        deleteNote(id, element);
    })

    // EVENTO DE DUPLICAR
    element.querySelector(".bi-file-earmark-plus").addEventListener("click",() => {
        duplicateNote(id)
    } )


    return element;


}

// FUNÇÃO FIXAR NOTA
function fixNote(id) {
    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.fixed = !targetNote.fixed;

    saveNotes(notes);

    showNotes();
}

// FUNÇÃO DELETAR NOTA
function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id !== id);

    saveNotes(notes);

    notesContainer.removeChild(element);
}

// FUNÇÃO DUPLICAR NOTA
function duplicateNote(id) {
    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    const noteObject = {
        id: generateId(),
        content: targetNote.content,
        fixed: false,
    } 
    
    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed);

    notesContainer.appendChild(noteElement);

    notes.push(noteObject);

    saveNotes(notes);
}


function updateNote(id, newContent) {

    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.content = newContent;

    saveNotes(notes);
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

function searchNotes(search) {

    const searchResults = getNotes().filter((note) => {
       return note.content.includes(search);
    })

    if(search !== "") {

        cleanNotes();

        searchResults.forEach((note) => {

            const noteElement = createNote(note.id, note.content, note.fixed)

            notesContainer.appendChild(noteElement);
        })

        return
    }

    cleanNotes();

    showNotes();
}

function exportData () {

    const notes = getNotes();

    const csvString = [
        ["ID", "Conteúdo", "Fixado?"],
        ...notes.map((note) => [note.id, note.content, note.fixed])
    ].map((e) => e.join(",")).join("\n");


    const element = document.createElement("a");

    element.href = "data:text/csv;charset=utf-8" + encodeURI(csvString);

    element.target = "_blank"

    element.download = "notes.csv"

    element.click();
}



// EVENTOS
addNoteBtn.addEventListener("click", () => addNote());

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    searchNotes(search);
})

noteInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        addNote();
    }
})

exportBtn.addEventListener("click", () => {
    exportData();
})



// INICIALIZAÇÃO
showNotes();