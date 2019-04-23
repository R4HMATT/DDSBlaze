var Twilio = require('twilio');
const twilioConnection = require('./Connection.json');
const express = require('express');
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

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**Create a POST route for sending SMS to a number req.recipients with body req.smsBody
 * (String, function(object, object)) => null
 */
// create a POST route for SMS
app.post('/sendSMS', (req, res) => {

  // Call twilio API
  try{
    client.messages.create({
      body: req.smsBody,
      to: req.recipient,
      from: "+16473608497"
    }).then((message) => {res.json({ "response": message })});
  } catch(e){
    res.json({"error" : e});
  }

});


