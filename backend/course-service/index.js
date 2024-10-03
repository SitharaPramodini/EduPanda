const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./src/config/dbConnection");

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
const courseRoutes = require('./src/routes/courseRoutes');

app.use('/api/courses', courseRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
