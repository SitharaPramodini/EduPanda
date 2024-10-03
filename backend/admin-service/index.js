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
const userRoutes = require('./src/routes/userRoutes');
const enrollmentRoutes = require('./src/routes/enrollmentRoutes');

app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/enrollments', enrollmentRoutes);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
