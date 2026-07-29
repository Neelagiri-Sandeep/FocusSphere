const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");
const Task = require("./models/Task");
const Note = require("./models/Note");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(taskRoutes);
app.use(noteRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to FocusSphere",
  });
});

// Test Route
app.get("/test", (req, res) => {
  res.send("Backend API is working!");
});


// Start Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});