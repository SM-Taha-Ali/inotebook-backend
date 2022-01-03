const express = require('express');
const { body } = require('express-validator');
const notesController = require('../controllers/notes');
const fetchuser = require('../middlewares/fetchUser');

const router = express.Router();

// CREATE NOTE
router.post('/createnotes',
    [
        body('title', 'Name must be atleast 3 characters long.').isLength({ min: 3 }),
        body('description', 'Password must be atleast 5 characters long.').isLength({ min: 5 }),
    ],
    fetchuser,
    notesController.createNotes
);

// RETRIEVE NOTES
router.get('/fetchallnotes', fetchuser, notesController.getNotes);

// UPDATE NOTE
router.put('/updatenote/:id', fetchuser, notesController.updateNote);

// DELETE NOTE
router.delete('/deletenote/:id', fetchuser, notesController.deleteNote)

module.exports = router; 