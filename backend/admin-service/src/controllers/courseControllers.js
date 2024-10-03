const Course = require('../models/courseModel');


//@desc Retreive All courses
//@route /api/courses/
//@access public
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor').exec();
        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};





//@desc Retrieve all new courses with update: false and status: pending
//@route GET /api/courses/new
//@access public
const getNewCourses = async (req, res) => {
    try {
        const newCourses = await Course.find({ status: 'Pending', Updated: false }).populate('instructor').exec();
        res.json(newCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//@desc Retrieve all updated courses with update: true and status: pending
//@route GET /api/courses/updated
//@access public
const getUpdatedCourses = async (req, res) => {
    try {
        const updatedCourses = await Course.find({ status: 'Pending', Updated: true }).populate('instructor').exec();
        res.json(updatedCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//@desc Approve a course
//@route PATCH /api/courses/approve/:id
//@access public
const approveCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course.status = 'Published';
        course.Updated = false;
        await course.save();
        res.json({ message: "Course approved successfully", course });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log({ message: error.message });
    }
};

//@desc Reject a course
//@route PATCH /api/courses/reject/:id
//@access public
const rejectCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course.status = 'Rejected';
        course.Updated = false;
        await course.save();
        res.json({ message: "Course rejected successfully", course });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log({ message: error.message });
    }
};

//@desc Fetch courses for a specific instructor
//@route GET /api/courses/instructor/:instructorId
//@access public
const getCoursesForInstructor = async (req, res) => {
    const { instructorId } = req.params;
    try {
        const courses = await Course.find({ instructor: instructorId });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllCourses,
    getNewCourses,
    getUpdatedCourses,
    approveCourse,
    rejectCourse,
    getCoursesForInstructor
};