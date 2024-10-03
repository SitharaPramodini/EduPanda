const mongoose = require('mongoose')


const Schema = mongoose.Schema

const EnrollmentSchema = new Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Enrollment', EnrollmentSchema)

