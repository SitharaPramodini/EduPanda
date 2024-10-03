const express = require("express");
const {
    getAllEnrollments
} = require("../controllers/enrollmentControllers");

const router = express.Router();

// GET all instructors
router.get("/", getAllEnrollments);


module.exports = router;