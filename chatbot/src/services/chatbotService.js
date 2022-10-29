const request = require('request');
const axios = require('axios');
const { IMAGE_GET_STARTED, MAIN_MENU, SEARCH_PRODUCT, GUIDE_TO_USE, SHOP_URL,
  AO_SO_MI, AO_KHOAC, AO_BLAZER, BUY_PRODUCT, IMAGE_MAIN_MENU_1,
  IMAGE_MAIN_MENU_2, VIEW_PRODUCT, IMAGE_MAIN_MENU_3 } = require('../constant');
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
            "image_url": IMAGE_MAIN_MENU_1,
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
            "title": "Ngày mở cửa",
            "image_url": IMAGE_MAIN_MENU_2,
            "subtitle": "Phục vụ cả tuần",
            "buttons": [
              {
                "type": "postback",
                "title": "Mua sản phẩm",
                "payload": BUY_PRODUCT
              },
            ]
          },
          {
            "title": "Địa điểm cửa hàng",
            "image_url": IMAGE_MAIN_MENU_3,
            "subtitle": "Gồm có 3 chi nhánh, ở Hà Nội. Tiện lợi cho các bạn lựa chọn",
            "buttons": [
              {
                "type": "postback",
                "title": "Menu Chính",
                "payload": MAIN_MENU
              },
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

const handleSendAoSoMiMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get('https://fashion-ecommerce-backend.herokuapp.com/api/v1/category/slug/ao-so-mi');
      const result = await axios.get(`https://fashion-ecommerce-backend.herokuapp.com/api/v1/products?category=${data.category._id}`);

      products = result.data.products;

      if (products.length > 5) {
        products.splice(5);
      }

      const response1 = getAoSoMiMenuTemplate(products);

      //send generic template message
      await callSendAPI(sender_psid, response1);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}


const handleSendAoKhoacMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response1 = getAoKhoacTemplate();

      //send generic template message
      await callSendAPI(sender_psid, response1);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}


const handleSendAoBlazerMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response1 = getAoBlazerTemplate();

      //send generic template message
      await callSendAPI(sender_psid, response1);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}

const getAoSoMiMenuTemplate = (products) => {
  // request get api ao so mi
  let response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": products.map((product) => {
          return {
            "title": product.name,
            "image_url": product.images[0].url,
            "subtitle": product.price,
            "buttons": [
              {
                "type": "web_url",
                "url": `${SHOP_URL}/product/${product._id}`,
                "title": "Xem sản phẩm"
              },
              {
                "type": "postback",
                "title": "Quay lại",
                "payload": AO_SO_MI
              },
            ]
          }
        })
      }
    }
  }
  return response;
}

const getAoKhoacMenuTemplate = () => {
  // request get api ao so mi
  let response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Áo khoác",
            "image_url": IMAGE_MAIN_MENU_1,
            "subtitle": "Dưới đây là một số áo khoác được bán tại shop.",
            "buttons": [
              {
                "type": "postback",
                "title": "Xem chi tiết",
                "payload": VIEW_PRODUCT
              },
            ]
          },
        ]
      }
    }
  }

  return response;
}

const getAoBlazerMenuTemplate = () => {
  // request get api ao so mi
  let response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Áo blazer",
            "image_url": IMAGE_MAIN_MENU_1,
            "subtitle": "Dưới đây là một số áo blazer được bán tại shop.",
            "buttons": [
              {
                "type": "postback",
                "title": "Xem chi tiết",
                "payload": VIEW_PRODUCT
              },
            ]
          },
        ]
      }
    }
  }

  return response;
}

module.exports = {
  handleGetStarted,
  handleSendMainMenu,
  handleSendAoSoMiMenu,
  handleSendAoBlazerMenu,
  handleSendAoKhoacMenu
}