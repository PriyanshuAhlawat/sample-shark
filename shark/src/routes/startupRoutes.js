const express = require("express");
const router = express.Router();
const StartupController = require("../controllers/startupController");

router.get("/startups", StartupController.getAllStartups);
router.post("/startup", StartupController.createStartup);
router.get('/tags/:tag', startupsController.getByTag);
module.exports = router;