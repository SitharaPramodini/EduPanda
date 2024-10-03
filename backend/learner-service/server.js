require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const enrollmentRoutes = require('./routes/enrollments')
const bodyParser = require("body-parser"); 


// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

// routes
app.use('/api/enrollments', enrollmentRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB')
            console.log("Listening on port: ", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })
    

module.exports = app