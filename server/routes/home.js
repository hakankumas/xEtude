const express = require("express");
const router = express.Router();

// Controllers
const homeController = require("../controllers/homeController");

router.post("/login", homeController.login);
router.get("/user/get/:id", homeController.getById);
router.post("/user/update-password", homeController.updateById);

module.exports = router;
