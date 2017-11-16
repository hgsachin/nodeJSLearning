const fs = require('fs');

var originalNote = {
    title: 'File Title',
    body: 'File Body'
};

var originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);

console.log(typeof originalNoteString);
console.log(typeof noteString);

console.log('originalNoteString : ', originalNoteString);
console.log('note : ', note);