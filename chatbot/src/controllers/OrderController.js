const axios = require('axios');
const { BACKEND_URL } = require('../constant');
const { callSendAPI } = require('../services/chatbotService');
require('dotenv').config();

const handleGetOrderProduct = async (req, res) => {
  const productId = req.query.productId;
  const sender_psid = req.query.sender_psid;
  const facebookAppId = process.env.FACEBOOK_APP_ID;
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/product/${productId}`);
    const product = data.product;
    return res.render('order.ejs', { product, sender_psid, facebookAppId });
  } catch (error) {
    console.log(error);
    res.status(404).send("Không tìm thấy sản phẩm này.")
  }
}

const handlePostOrderProduct = async (req, res) => {
  const { psid, shippingInfo, orderItems, itemsPrice, shippingPrice,
    totalPrice, paymentStatus, paymentType } = req.body;

  const newOrder = {
    shippingInfo, orderItems, itemsPrice, shippingPrice,
    totalPrice, paymentStatus, paymentType, user: null
  }

  try {
    const { data } = await axios.post(`${BACKEND_URL}/api/v1/order`, newOrder);
    const order = data.order;
    const item = data.order.orderItems[0];
    let response1 = {
      "text": `---Thông tin đơn đặt hàng---
        Họ tên: ${order.shippingInfo.name}
        Email: ${order.shippingInfo.email}
        Sđt: ${order.shippingInfo.phoneNo}
        Tỉnh thành phố: ${order.shippingInfo.city}
        Địa chỉ: ${order.shippingInfo.address}

        Sản phẩm: ${item.product.name} - ${item.size.name} - ${item.color.name} x ${item.quantity}
        Tổng cộng: ${order.totalPrice}
        `
    }
    await callSendAPI(psid, response1);
    res.status(200).send('OK');
  } catch (error) {
    console.log(error);
    res.status(400).send('Error')
  }
}

module.exports = {
  handleGetOrderProduct,
  handlePostOrderProduct
}