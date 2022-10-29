const axios = require('axios');
const { BACKEND_URL } = require('../constant');

const handleGetOrderProduct = async (req, res) => {
  const productId = req.query.productId;
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/product/${productId}`);
    const product = data.product;
    return res.render('order.ejs', { product });
  } catch (error) {
    console.log(error);
    res.status(404).send("Không tìm thấy sản phẩm này.")
  }
}

const handlePostOrderProduct = (req, res) => {

}

module.exports = {
  handleGetOrderProduct,
  handlePostOrderProduct
}