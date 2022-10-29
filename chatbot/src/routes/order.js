const express = require("express");
const { handleGetOrderProduct, handlePostOrderProduct } = require("../controllers/OrderController");

const router = express.Router();

router.get("/order", handleGetOrderProduct);
router.post("/order", handlePostOrderProduct);

module.exports = router;