const express = require("express");
const { getHomePage, getWebhook, postWebhook, setupProfile } = require("../controllers/HomeController");

const router = express.Router();

router.get("/", getHomePage);

router.post('/webhook', postWebhook);
router.get('/webhook', getWebhook);

router.post('/setup-profile', setupProfile);

module.exports = router;