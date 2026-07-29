const express = require("express");

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Task
router.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority,
      dueDate,
      dueTime,
    } = req.body;

    const newTask = new Task({
      title,
      description,
      category,
      priority,
      dueDate,
      dueTime,
      user: req.user.id,
    });

    await newTask.save();

    res.json({
      message: "Task Added Successfully",
      task: newTask,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get All Tasks
router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    });

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Update Task
router.put("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      category,
      priority,
      dueDate,
      dueTime,
      completed,
    } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      {
        title,
        description,
        category,
        priority,
        dueDate,
        dueTime,
        completed,
      },
      {
        new: true,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Delete Task
router.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;


