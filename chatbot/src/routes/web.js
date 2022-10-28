const express = require("express");
const { getHomePage, getWebhook, postWebhook } = require("../controllers/HomeController");

const router = express.Router();

router.get("/", getHomePage);

router.post('/webhook', postWebhook);
router.get('/webhook', getWebhook);

module.exports = router;