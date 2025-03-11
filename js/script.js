// ELEMENTOS
const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");

const addNoteBtn = document.querySelector(".add-note");



// FUNÇÕES
function addNote() {

    const noteObject = {
        id: generateId,
        content: noteInput.value,
        fixed: false,
    }

    const noteElement = creatNote(noteObject.id, noteInput.value)

    notesContainer.appendChild(noteElement);

}

function generateId () {
    return Math.floor(Math.random() * 5000);
}

function creatNote(id, content, fixed) {

    const element = document.createElement("div");

    element.classList.add("note");

    const textArea = document.createElement("textarea");

    textArea.value = content;

    textArea.placeholder = "Adicione uma nota...";

    element.appendChild(textArea);

    return element;

}



// EVENTOS
addNoteBtn.addEventListener("click", () => addNote());