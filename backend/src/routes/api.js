const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");

router.get("/data", dataController.getData);
router.post("/data", dataController.addData);

router.get("/data/:id", dataController.getDataById);
router.put("/data/:id", dataController.updateData);

module.exports = router;
