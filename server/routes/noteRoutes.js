const express = require("express");

const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Note
router.post("/notes", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({
      title,
      content,
      user: req.user.id,
    });

    await newNote.save();

    res.json({
      message: "Note Added Successfully",
      note: newNote,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get Notes
router.get("/notes", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    });

    res.json(notes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Update Note
router.put("/notes/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      {
        title,
        content,
      },
      {
        new: true,
      }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json({
      message: "Note Updated Successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Delete Note
router.delete("/notes/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json({
      message: "Note Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


module.exports = router;