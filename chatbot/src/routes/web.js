import express from "express";
import { getHomePage } from "../controllers/HomeController";

const router = express.Router();

router.get("/", getHomePage);

module.exports = router;