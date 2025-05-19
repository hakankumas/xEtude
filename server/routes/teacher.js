const express = require("express");
const router = express.Router();

// Controllers
const teacherController = require("../controllers/teacherController");

router.get("/all-teacher", teacherController.all_teacher);
router.get("/active-etudes/:teacher_id", teacherController.active_etudes);
router.get("/request-etudes/:teacher_id", teacherController.request_etudes);
// prettier-ignore
router.get("/attend-etudes-teacher/:teacher_id", teacherController.attend_etudes_teacher);
// prettier-ignore
router.get("/attend-etudes-etude/:etude_id", teacherController.attend_etudes_etude);
// prettier-ignore
router.post("/update-attend-etude", teacherController.update_attend_etude);
router.post("/create-etude", teacherController.create_etude);
router.post("/update-request-etude", teacherController.update_request_etude);
router.post("/create-notice", teacherController.create_notice);
router.get("/get-notices/:etude_id", teacherController.get_notices);

module.exports = router;
