const Enrollment = require('../models/enrollmentModel');

//@desc View all enrollments
//@route GET /api/users/enrollments
//@access public
const getAllEnrollments = async (req, res) => {
    try {
        const enrollment = await Enrollment.find();
        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEnrollments
};