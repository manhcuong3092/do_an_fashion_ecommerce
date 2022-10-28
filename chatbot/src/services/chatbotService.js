const request = require('request');
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const username = await getUsername(sender_psid);
      const response = { "text": `Ok. Xin chào mừng bạn ${username} đến với shop Amando.` }
      await callSendAPI(sender_psid, response);
      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}

let getUsername = (sender_psid) => {
  // Send the HTTP request to the Messenger Platform
  return new Promise((resolve, reject) => {
    request({
      "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
      "qs": { "access_token": PAGE_ACCESS_TOKEN },
      "method": "GET",
    }, (err, res, body) => {
      console.log(body);
      if (!err) {
        let response = JSON.parse(body);
        let username = `${response.last_name} ${response.first_name}`;
        resolve(username);
      } else {
        console.error("Unable to send message:" + err);
        reject(err)
      }
    });
  })
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    console.log(body);
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

module.exports = {
  handleGetStarted
}