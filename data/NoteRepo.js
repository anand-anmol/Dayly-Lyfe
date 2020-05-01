const   db = require(`../models/index.js`);

class NoteRepo {
    // This is the constructor.
    NoteRepo() {
    }

    // Gets all notes.
    async all() {
        let notes = await db.note.findAll();
        if(notes) {
            return { errorMessage:"", notes:notes}
        }
        else {
            return { errorMessage:"Notes not found.", notes:[]}
        }
    }

    async getNote(id) {
        let note = await db.note.findOne( {where: {id:id}});

        if(note) {
            return { errorMessage:"", note:note}
        }
        else {
            return { errorMessage:"Note not found.", notes:{}}
        }
    }

    async create(noteObj) {
        let note = await db.note.create(noteObj);
        if(note) {
            return { errorMessage:"", note:note}
        }
        else {
            return { errorMessage:"Note not found.", note:[]}
        }
    }

    async update(noteObj) {

        let updatedObj = await  db.note.update(
            // Updates these selected properties only.
            {
                author: noteObj.author,
                content: noteObj.content,
                date: noteObj.date
            },
            // Only apply update to unique object.
            {
                where: {id: noteObj.id}
            }
        ).then(result => {
            return { errorMessage:'', note:noteObj }
        }).catch(err => {
            errorMessage = err.message
            return { errorMessage:err, note:noteObj }
        });
        if(updatedObj) {
            return { errorMessage:'', note:noteObj }
        }
        else {
            return {
                errorMessage:'Error occured during update.',
                note:noteObj }
        }
    }

    async delete(id) {
        try {
            let note = await db.note.destroy( {where: {id:id}});
            if(note) {
                return { errorMessage:"", notes:note}
            }
            else {
                return { errorMessage:"Note not deleted."}
            }
        }
        catch(e) {
            return { errorMessage:e.message}
        }
    }
}
module.exports = NoteRepo;

