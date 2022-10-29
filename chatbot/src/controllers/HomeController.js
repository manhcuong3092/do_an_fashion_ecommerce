
const request = require('request');
const { GET_STARTED, SHOP_URL, RESTART_BOT, FANPAGE_URL, MAIN_MENU, AO_SO_MI, AO_BLAZER, AO_KHOAC, VIEW_SHOP_INFO } = require('../constant');
const chatbotService = require('../services/chatbotService');

require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const getHomePage = (req, res) => {
  return res.render('homepage.ejs');
}

const postWebhook = (req, res) => {

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }

    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
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

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
    }
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  }

  // Send the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    case 'yes':
      response = { "text": "Thanks!" };
      break;
    case 'no':
      response = { "text": "Oops, try sending another image." }
      break;
    case RESTART_BOT:
    case GET_STARTED:
      await chatbotService.handleGetStarted(sender_psid);
      response = { "text": "Ok. Xin chào mừng bạn đến với shop Amando." }
      break;
    case MAIN_MENU:
      await chatbotService.handleSendMainMenu(sender_psid);
      break;
    case AO_SO_MI:
      await chatbotService.handleSendAoSoMiMenu(sender_psid);
      break;
    case AO_BLAZER:
      await chatbotService.handleSendAoBlazerMenu(sender_psid);
      break;
    case AO_KHOAC:
      await chatbotService.handleSendAoKhoacMenu(sender_psid);
      break;
    case VIEW_SHOP_INFO:
      await chatbotService.handleSendShopInfoMenu(sender_psid);
      break;
    case VIEW_SHOP_IMAGE:
      await chatbotService.handleSendShopInfoImage(sender_psid);
      break;
    default:
      response = { "text": "Oops! Có lỗi xảy ra. Không phản hồi được với postback này" }
  }

  // Send the message to acknowledge the postback
  // callSendAPI(sender_psid, response);
}


const setupProfile = async (req, res) => {
  // Call profile facebook api
  // Construct the message body
  let request_body = {
    "get_started": { "payload": GET_STARTED },
    "whitelisted_domains": ["https://amando-chatbot.herokuapp.com/"]
  }

  // Send the HTTP request to the Messenger Platform
  await request({
    "uri": `https://graph.facebook.com/v15.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    console.log(body);
    if (!err) {
      console.log('Setup persistent menu succeeds!')
    } else {
      console.error("Unable to setup persistent menu:" + err);
    }
  });

  return res.send("Setup persistent menu succeeds!")
}

const setupPersistentMenu = async (req, res) => {
  // Call persistent menu facebook api
  // Construct the message body
  let request_body = {
    "persistent_menu": [
      {
        "locale": "default",
        "composer_input_disabled": false,
        "call_to_actions": [
          {
            "type": "web_url",
            "title": "Đi đến website",
            "url": SHOP_URL,
            "webview_height_ratio": "full"
          },
          {
            "type": "web_url",
            "title": "Facebook Amando",
            "url": FANPAGE_URL,
            "webview_height_ratio": "full"
          },
          {
            "type": "postback",
            "title": "Khởi động lại Bot",
            "payload": RESTART_BOT
          }
        ]
      }
    ]
  }

  // Send the HTTP request to the Messenger Platform
  await request({
    "uri": `https://graph.facebook.com/v15.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    console.log(body);
    if (!err) {
      console.log('Setup user profile succeeds!')
    } else {
      console.error("Unable to setup user profile:" + err);
    }
  });

  return res.send("Setup user profile succeeds!")
}

module.exports = {
  getHomePage,
  postWebhook,
  getWebhook,
  setupProfile,
  setupPersistentMenu
}