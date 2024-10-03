const User = require('../models/userModel');

//@desc View all instructors
//@route GET /api/users/instructors
//@access public
const getAllInstructors = async (req, res) => {
    try {
        const instructors = await User.find({ role: 'instructor' });
        res.json(instructors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//@desc View all learners
//@route GET /api/users/learners
//@access public
const getAllLearners = async (req, res) => {
    try {
        const learners = await User.find({ role: 'learner' });
        res.json(learners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllInstructors,
    getAllLearners
};
