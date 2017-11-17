const fs = require('fs');

var fetchNotes = () => {
    try{
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        console.log('Added file with title', note.title);
    } else {
        console.log('Not adding note as title already exists');
    }
};

var getAll = () => {
    console.log('Getting all notes');
}

var removeNote = (title) => {
    var notes = fetchNotes();
    var updatedNotes = notes.filter((note) => note.title !== title);
    if(updatedNotes.length !== notes.length){
        saveNotes(updatedNotes);
        console.log(`Note removed with Title : ${title}`);
    } else {
        console.log(`No note found with title : ${title}`);
    }
}

module.exports = {
    addNote,
    getAll,
    removeNote
};