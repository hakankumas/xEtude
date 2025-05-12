const express = require("express");
const router = express.Router();

// Controllers
const teacherController = require("../controllers/teacherController");

router.get("/all-teacher", teacherController.all_teacher);
// router.get("/work-hours/:id", teacherController.work_hours);
router.get("/active-etudes/:teacher_id", teacherController.active_etudes);
router.get("/request-etudes/:teacher_id", teacherController.request_etudes);
router.post("/create-etude", teacherController.create_etude);
router.post("/update-request-etude", teacherController.update_request_etude);
router.post("/create-notice", teacherController.create_notice);
router.get("/get-notices/:etude_id", teacherController.get_notices);

module.exports = router;
