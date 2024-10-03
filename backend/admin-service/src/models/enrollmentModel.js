const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    uid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    cid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    payment: { type: Number, required: true },
    paymentType: { type: String, required: true },
    
},{
    timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
