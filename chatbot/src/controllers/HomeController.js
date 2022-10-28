require('dotenv').config();

const getHomePage = (req, res) => {
  return res.render('homepage.ejs');
}

const postWebhook = (req, res) => {
  let body = req.body;
  console.log(req.body);

  //Check this is an event from a page subscriptinon
  if(body.object === 'page') {
    //Iterates over each entry - there may be multiple if batched
    body.entry.forEach((entry) => {
      //Get message entry.messaging is array, but only contain 1 mess, so get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    //Return a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    //Return 404 if event not from a page subscription
    res.sendStatus(404);
  }
}

const getWebhook = (req, res) => {
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
}

module.exports = {
  getHomePage,
  postWebhook,
  getWebhook
}