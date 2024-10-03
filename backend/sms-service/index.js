require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const accountSid= process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.json());


app.post('/send-sms', async (req, res) => {  

    let msgOptions = {
        from: process.env.MY_TWILIO_NUMBER,
        to: req.body.to,
        body: req.body.text
    }

    try {
        const message = await client.messages.create(msgOptions);
        console.log("TwilioMessage", message);
        res.status(200).send(message); 
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message); 
    }

});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
