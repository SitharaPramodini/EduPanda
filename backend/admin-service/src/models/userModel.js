const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {type: String,required: true, enum: ['admin', 'learner', 'instructor'], default: 'learner' },
    photo: { type: String, required: true },
    phone: { type: String, default: "+94" },
    bio: { type: String, default: "bio" },
    isAdmin: { type: Boolean, default: false },
    isInstructor: { type: Boolean, default: false },
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);