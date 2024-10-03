const express = require("express");
const {
    createCourse,getAllCourses,getCourseById,updateCourse,deleteCourse
} = require("../controllers/courseController");

const router = express.Router();


// GET all Courses
router.get("/", getAllCourses);

// POST a new course
router.post("/", createCourse);

// DELETE a course
router.delete("/:id", deleteCourse);

// UPDATE a course
router.patch("/:id", updateCourse);

//GET a single course
router.get("/:id", getCourseById);

module.exports = router;