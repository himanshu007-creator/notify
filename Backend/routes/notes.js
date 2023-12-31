const express = require("express");
const router = express.Router();
const { query, validationResult, body } = require('express-validator');
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Notes');
const { findByIdAndUpdate } = require("../models/User");

//Route 1 : Get all the notes using : Get "/api/auth/getuser". Login required

router.get('/fetchnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }

})

//Route 2 : Add notes using : Post "/api/notes/adduser". Login required

router.post('/addnotes', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 4 }),
  body('description', 'Description must be atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body

    // if there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    const note = new Note({
      title, description, tag, user: req.user.id
    })
    const savenotes = await note.save();
    res.json(savenotes)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }

})
//Route 3 : Updating an existing notes using : Post "/api/notes/updatenotes". Login required

router.put('/updatenotes/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body
  try {
    //Create a New Notes Object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find a Note to be updated and update it
    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(404).send("Not Found") }


    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})


//Route 4 : Deleting a  note using : Delete "/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body
  try {
    // Find a Note to be updated and update it
    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(404).send("Not Found") }


    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "Success": "The Note has been deleted ", note: note })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})

module.exports = router