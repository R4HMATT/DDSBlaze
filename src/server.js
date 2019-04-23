var Twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');
const twilioConnection = require('./Connection.json');

const app = express();
const port = process.env.PORT || 9000;

/* Setup and send twilio SMS messages  */
// Authorization
var accountSid = twilioConnection.twilio.accountSid;
var authToken = twilioConnection.twilio.authToken;

// Setup client
var client = new Twilio(accountSid, authToken);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

/* Enabls CORS */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Create a POST route for sending SMS to a number req.recipients with body req.smsBody */
app.post('/_api/sendSMS', bodyParser.json(), (req, res) => {
  console.log(req.body.recipients);
  res.header("Content-Type", "application/json");

  // Call twilio API
  for(let i = 0; i < req.body.recipients.length; i++){
    try{
      client.messages.create({
        body: req.body.smsBody,
        to: req.body.recipients[i],
        from: "+16473608497"
      }).then((message) => {res.json({ "twilioResponse": message, "ok": true })});
    } catch(e){
      console.log(e);
      res.json({"Error" : e, "ok": false});
    }
  }

});


