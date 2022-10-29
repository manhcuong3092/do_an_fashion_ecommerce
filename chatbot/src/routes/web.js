const express = require("express");
const { getHomePage, getWebhook, postWebhook, setupProfile,
  setupPersistentMenu } = require("../controllers/HomeController");

const router = express.Router();

router.get("/", getHomePage);

router.post('/webhook', postWebhook);
router.get('/webhook', getWebhook);

//Setup get started buttom, whitelist domain
router.post('/setup-profile', setupProfile);
//Setup persistent menu
router.post('/setup-persistent-menu', setupPersistentMenu);

module.exports = router;