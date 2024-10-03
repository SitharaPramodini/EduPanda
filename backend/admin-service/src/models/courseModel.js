const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['Lecture', 'Video', 'Quiz' , 'Project'], required: true },
    lectureNotes: { type: String },
    videoURL: { type: String }, 
    quizQuestions: [{ type: String }] 
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    level: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Pending', 'Published', 'Rejected'], default: 'Pending' , required: true },
    Updated: { type: Boolean , default: false , required: true},
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    contents: [contentSchema] 
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Course', courseSchema);
