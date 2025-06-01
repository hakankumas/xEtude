const express = require("express");
const router = express.Router();

// Controllers
const adminController = require("../controllers/adminController");

// prettier-ignore
router.get("/user-types", adminController.user_types);
// prettier-ignore
router.post("/create-notice-for-parent", adminController.create_notice_for_parent);
// prettier-ignore
router.get("/count-etude-by-lessons", adminController.count_etude_by_lessons);
// prettier-ignore
router.get("/count-etude-by-teachers", adminController.count_etude_by_teachers);
// prettier-ignore
router.get("/count-etude-by-class-number", adminController.count_etude_by_class_number);

module.exports = router;
