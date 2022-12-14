const request = require('request');
const axios = require('axios');
const { IMAGE_GET_STARTED, MAIN_MENU, SEARCH_PRODUCT, GUIDE_TO_USE, SHOP_URL,
  AO_SO_MI, AO_KHOAC, AO_BLAZER, IMAGE_MAIN_MENU_1,
  IMAGE_MAIN_MENU_2, IMAGE_MAIN_MENU_3, VIEW_SHOP_INFO, VIEW_SHOP_IMAGE,
  ORDER_URL, IMAGE_GIF_WELCOME, GUIDE_VIDEO_URL, BACKEND_URL, AO_HOODIE, QUAN_AU, QUAN_JEAN } = require('../constant');
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const username = await getUsername(sender_psid);
      const response1 = { "text": `Xin chào mừng bạn đến với shop Amando.` } // ${username}
      const response2 = getImageStartedTemplate();
      const response3 = getStartedTemplate();

      //send text message
      await callSendAPI(sender_psid, response1);

      //send generic template message
      await callSendAPI(sender_psid, response2);

      //send quick reply
      await callSendAPI(sender_psid, response3);

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

const getImageStartedTemplate = () => {
  const response = {
    "attachment": {
      "type": "image",
      "payload": {
        "url": IMAGE_GIF_WELCOME,
        "is_reusable": true
      }
    }
  }
}

// Sends response messages via the Send API
async function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  await sendMarkSeenMessage(sender_psid);
  await sendTypingOn(sender_psid);

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

// Sends response typing on via the Send API
function sendTypingOn(sender_psid) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "sender_action": "typing_on"
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
      console.log('sendTypingOn sent!')
    } else {
      console.error("Unable to send sendTypingOn:" + err);
    }
  });
}

// Sends response mark seen via the Send API
function sendMarkSeenMessage(sender_psid) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "sender_action": "mark_seen"
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
      console.log('sendTypingOn sent!')
    } else {
      console.error("Unable to send sendTypingOn:" + err);
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
            "title": "Danh mục sản phẩm của cửa hàng",
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
            "title": "Danh mục sản phẩm của cửa hàng",
            "image_url": IMAGE_MAIN_MENU_1,
            "subtitle": "Dưới đây là các lựa chọn của shop.",
            "buttons": [
              {
                "type": "postback",
                "title": "Áo hoodie",
                "payload": AO_HOODIE
              },
              {
                "type": "postback",
                "title": "Quần âu",
                "payload": QUAN_AU
              },
              {
                "type": "postback",
                "title": "Quần jean",
                "payload": QUAN_JEAN
              }
            ]
          },
          {
            "title": "Địa điểm cửa hàng",
            "image_url": IMAGE_MAIN_MENU_3,
            "subtitle": "Gồm có 3 chi nhánh, ở Hà Nội. Tiện lợi cho các bạn lựa chọn",
            "buttons": [
              {
                "type": "postback",
                "title": "Xem Thông tin",
                "payload": VIEW_SHOP_INFO
              },
            ]
          },
          {
            "title": "Ngày mở cửa",
            "image_url": IMAGE_MAIN_MENU_2,
            "subtitle": "Phục vụ cả tuần",
            "buttons": [
              {
                "type": "web_url",
                "url": `${SHOP_URL}/shop`,
                "title": "Xem trang web"
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
      let { data } = await axios.get(`${BACKEND_URL}/api/v1/category/slug/ao-so-mi`);
      const result = await axios.get(`${BACKEND_URL}/api/v1/products?category=${data.category._id}`);

      products = result.data.products;

      if (products.length > 5) {
        products.splice(5);
      }

      const response1 = getProductMenuTemplate(products, sender_psid);

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
      let { data } = await axios.get(`${BACKEND_URL}/api/v1/category/slug/ao-khoac`);
      const result = await axios.get(`${BACKEND_URL}/api/v1/products?category=${data.category._id}`);

      products = result.data.products;

      if (products.length > 5) {
        products.splice(5);
      }

      const response1 = getProductMenuTemplate(products, sender_psid);

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
      let { data } = await axios.get(`${BACKEND_URL}/api/v1/category/slug/ao-blazer`);
      const result = await axios.get(`${BACKEND_URL}/api/v1/products?category=${data.category._id}`);

      products = result.data.products;

      if (products.length > 5) {
        products.splice(5);
      }

      const response1 = getProductMenuTemplate(products, sender_psid);

      //send generic template message
      await callSendAPI(sender_psid, response1);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}

const handleSendAoHoodieMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get(`${BACKEND_URL}/api/v1/category/slug/ao-hoodie`);
      const result = await axios.get(`${BACKEND_URL}/api/v1/products?category=${data.category._id}`);

      products = result.data.products;

      if (products.length > 5) {
        products.splice(5);
      }

      const response1 = getProductMenuTemplate(products, sender_psid);

      //send generic template message
      await callSendAPI(sender_psid, response1);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}


const handleSendQuanAuMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get(`${BACKEND_URL}/api/v1/category/slug/quan-au`);
      const result = await axios.get(`${BACKEND_URL}/api/v1/products?category=${data.category._id}`);

      products = result.data.products;

      if (products.length > 5) {
        products.splice(5);
      }

      const response1 = getProductMenuTemplate(products, sender_psid);

      //send generic template message
      await callSendAPI(sender_psid, response1);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}


const handleSendQuanJeanMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get(`${BACKEND_URL}/api/v1/category/slug/quan-jean`);
      const result = await axios.get(`${BACKEND_URL}/api/v1/products?category=${data.category._id}`);

      products = result.data.products;

      if (products.length > 5) {
        products.splice(5);
      }

      const response1 = getProductMenuTemplate(products, sender_psid);

      //send generic template message
      await callSendAPI(sender_psid, response1);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}

const getProductMenuTemplate = (products, sender_psid) => {
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
            "subtitle": `${product.price.toLocaleString('vi-VN')} ₫`,
            "buttons": [
              {
                "type": "web_url",
                "url": `${SHOP_URL}/product/${product.slug}`,
                "title": "Xem sản phẩm"
              },
              {
                "type": "postback",
                "title": "Quay lại",
                "payload": MAIN_MENU
              },
            ]
          }
        })
      }
    }
  }
  return response;
}

const handleSendShopInfoMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        "text": `🏠 Store 1: Số 1 đường Vạn Xuân, xã Hạ Mỗ. huyện Đan Phượng, tp Hà Nội.
      🏠 Store 2: số 6 Dương Quảng Hàm, Cầu Giấy, Hà Nội
      🏠 Store 3: số 332 Bạch Mai, Hai Bà Trưng, Hà Nội` };
      const response1 = getAboutUsTemplate();

      await callSendAPI(sender_psid, response);
      //send generic template message
      await callSendAPI(sender_psid, response1);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}

const handleSendShopInfoImage = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response1 = getImageShopTemplate();

      //send generic template message
      await callSendAPI(sender_psid, response1);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}

let getImageShopTemplate = () => {
  let response = {
    "attachment": {
      "type": "image",
      "payload": {
        "url": IMAGE_GET_STARTED,
        "is_reusable": true
      }
    }
  }
  return response;
}

let getAboutUsTemplate = () => {
  let response = {
    "attachment": {
      "type": "image",
      "payload": {
        "template_type": "button",
        "text": "Amano location",
        "url": IMAGE_GET_STARTED,
        "buttons": [
          {
            "type": "web_url",
            "url": `${SHOP_URL}/about-us`,
            "title": "Xem chi tiết"
          },
          {
            "type": "postback",
            "payload": VIEW_SHOP_IMAGE,
            "title": "Ảnh shop"
          },
          {
            "type": "postback",
            "payload": MAIN_MENU,
            "title": "Quay lại"
          },
        ]
      }
    }
  }
  return response;
}

const handleGuildeToUseBot = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const username = await getUsername(sender_psid);
      const response = {
        "text": `Xin chào bạn ${username}, Mình là chatbot của Amano. 
      Để biết thêm thông tin thì bạn vui lòng xem video bên dưới 😁`}
      const response1 = getMediaTemplate();

      await callSendAPI(sender_psid, response);
      //send generic template message
      await callSendAPI(sender_psid, response1);

      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}

const getMediaTemplate = () => {
  const response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "media",
        "elements": [
          {
            "media_type": "video",
            // "attachment_id": "526118808962516",
            "url": GUIDE_VIDEO_URL,
            "buttons": [
              {
                "type": "postback",
                "payload": MAIN_MENU,
                "title": "Menu Chính"
              },
              {
                "type": "web_url",
                "title": "Đi đến website",
                "url": SHOP_URL
              },
            ]
          }
        ]
      }
    }
  };
  return response;
}

const handleTextMessage = async (sender_psid, received_message) => {
  let response;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    const text = received_message.text.toLowerCase()
    console.log(text);
    const index = text.indexOf("tìm kiếm:");
    if (index === -1) {
      return;
    }
    const keyword = text.split("tìm kiếm:")[1].trim();
    if (!keyword) {
      response = {
        "text": `Hãy nhập từ khóa để tìm kiếm.`
      }
    } else {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/products?keyword=${keyword}`);
        if (data.products.length === 0) {
          response = {
            "text": `Không tìm thấy sản phẩm nào.`
          }
        } else {
          response = getProductMenuTemplate(data.products);
        }
      } catch (error) {
        console.log(error);
        response = {
          "text": `Có lỗi xảy ra khi tìm kiếm sản phẩm.`
        }
      }
    }
    // response = {
    //   "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
    // }
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

const handleSearchProductMenu = async (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        "text": `Bạn hãy điền từ khóa theo cú pháp sau:\nTìm kiếm: <Từ khóa>`
      }

      await callSendAPI(sender_psid, response);
      resolve('done');
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  handleGetStarted,
  handleSendMainMenu,
  handleSendAoSoMiMenu,
  handleSendAoBlazerMenu,
  handleSendAoKhoacMenu,
  handleSendShopInfoMenu,
  handleSendShopInfoImage,
  callSendAPI,
  handleGuildeToUseBot,
  handleTextMessage,
  handleSearchProductMenu,
  handleSendAoHoodieMenu,
  handleSendQuanAuMenu,
  handleSendQuanJeanMenu
}