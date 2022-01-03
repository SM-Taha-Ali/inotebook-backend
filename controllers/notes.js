const { validationResult } = require('express-validator');
const Notes = require('../models/Notes')



// CREATE NOTES

async function createNotes(req, res) {
    try {
        const errors = validationResult(req);
        // Checking if validations are fulfilled
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// RETRIEVE NOTES 

async function getNotes(req, res) {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// UPDATE NOTES

async function updateNote(req, res) {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found!") }
        if (note.user.toString() == req.user.id) {
            const { title, description, tag } = req.body;
            const newNote = {};
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note);
        } else if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed!")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// DELETE NOTES

async function deleteNote(req, res) {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found!") }
        if (note.user.toString() == req.user.id) {
            note = await Notes.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Note has been deleted.", note: note });
        } else if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed!")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



module.exports = {
    getNotes,
    createNotes,
    updateNote,
    deleteNote
}

