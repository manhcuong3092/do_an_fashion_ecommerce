import express from "express";
import { getHomePage, getWebhook, postWebhook } from "../controllers/HomeController";

const router = express.Router();

router.get("/", getHomePage);

router.post('/webhook', postWebhook);
router.get('/webhook', getWebhook);

module.exports = router;