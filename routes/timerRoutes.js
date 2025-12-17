const express = require("express");
const router = express.Router();
const controller = require("../controllers/timerController");

router.get("/", controller.getAllTimers);
router.get("/:id", controller.getTimerById);
router.post("/", controller.createTimer);
router.delete("/:id", controller.deleteTimer);

module.exports = router;
