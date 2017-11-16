const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var cmd = argv._[0];

if (cmd === 'Add') {
    notes.addNote(argv.title, argv.body);
} else if (cmd === 'list') {
    notes.getAll();
} else if (cmd === 'read') {
    console.log('Reading note');
} else if (cmd === 'remove') {
    console.log('Removing the node');
} else {
    console.log('Unrecognized command');
}