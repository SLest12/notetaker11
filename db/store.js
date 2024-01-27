const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }
  addNote(newNote) {
    const noteToSave = {
      id: uuidv1(),
      title: newNote.title,
      text: newNote.text
    }
    return this.getNotes()
      .then(existingNotes => {
        const notes = [...existingNotes, noteToSave]
        // .then( notes =>{
        console.log(notes)
        this.write(notes)
      })

  }
  removeNote(id) {
    console.log (id)
    return this.getNotes()
      .then(existingNotes => {
        let notesNoDeleted = []
        for (let i = 0; i < existingNotes.length; i++) {
          if (existingNotes[i].id != id) {
            notesNoDeleted.push(existingNotes[i])
          }
        }
        console.log (notesNoDeleted)
        this.write(notesNoDeleted)
      })
  }
}

module.exports = Store;

