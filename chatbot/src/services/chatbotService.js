const request = require('request');
const { IMAGE_GET_STARTED, MAIN_MENU, SEARCH_PRODUCT, GUIDE_TO_USE, SHOP_URL, AO_SO_MI, AO_KHOAC, AO_BLAZER } = require('../constant');
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const username = await getUsername(sender_psid);
      const response1 = { "text": `Xin chào mừng bạn ${username} đến với shop Amando.` }
      const response2 = getStartedTemplate();

      //send text message
      await callSendAPI(sender_psid, response1);

      //send generic template message
      await callSendAPI(sender_psid, response2);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}

let getStartedTemplate = () => {
  let response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Xin chào bạn đến với shop Amando!",
            "image_url": IMAGE_GET_STARTED,
            "subtitle": "Dưới đây là các lựa chọn của shop.",
            "buttons": [
              {
                "type": "postback",
                "title": "Menu Chính",
                "payload": MAIN_MENU
              },
              {
                "type": "postback",
                "title": "Tìm sản phẩm",
                "payload": SEARCH_PRODUCT
              },
              {
                "type": "postback",
                "title": "Hướng dẫn sử dụng bot",
                "payload": GUIDE_TO_USE
              }
            ]
          },
          {
            "title": "Xin chào bạn đến với shop Amando!",
            "image_url": IMAGE_GET_STARTED,
            "subtitle": "Đi tới trang web.",
            "buttons": [
              {
                "type": "web_url",
                "url": SHOP_URL,
                "title": "Xem trang web"
              },
            ]
          }
        ]
      }
    }
  }
  return response;
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

let getMainMenuTemplate = () => {
  let response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Danh mục sản phẩm của nhà hàng",
            "image_url": IMAGE_GET_STARTED,
            "subtitle": "Dưới đây là các lựa chọn của shop.",
            "buttons": [
              {
                "type": "postback",
                "title": "Áo sơ mi",
                "payload": AO_SO_MI
              },
              {
                "type": "postback",
                "title": "Áo khoác",
                "payload": AO_KHOAC
              },
              {
                "type": "postback",
                "title": "Áo blazer",
                "payload": AO_BLAZER
              }
            ]
          },
          {
            "title": "Xin chào bạn đến với shop Amando!",
            "image_url": IMAGE_GET_STARTED,
            "subtitle": "Dưới đây là các lựa chọn của shop.",
            "buttons": [
              {
                "type": "postback",
                "title": "Mua sản phẩm",
                "payload": MAIN_MENU
              },
            ]
          },
          {
            "title": "Xin chào bạn đến với shop Amando!",
            "image_url": IMAGE_GET_STARTED,
            "subtitle": "Dưới đây là các lựa chọn của shop.",
            "buttons": [
              {
                "type": "postback",
                "title": "Menu Chính",
                "payload": MAIN_MENU
              },
              {
                "type": "postback",
                "title": "Tìm sản phẩm",
                "payload": SEARCH_PRODUCT
              },
              {
                "type": "postback",
                "title": "Hướng dẫn sử dụng bot",
                "payload": GUIDE_TO_USE
              }
            ]
          },
        ]
      }
    }
  }
  return response;
}

const handleSendMainMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response1 = getMainMenuTemplate();

      //send generic template message
      await callSendAPI(sender_psid, response1);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  handleGetStarted,
  handleSendMainMenu
}