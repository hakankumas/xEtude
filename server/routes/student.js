const express = require("express");
const router = express.Router();

// Controllers
const studentController = require("../controllers/studentController");

router.get("/active-etudes/:etude_class", studentController.active_etudes);
router.get("/etude-history/:user_id", studentController.etude_history);
router.get("/my-etudes/:student_id", studentController.my_etudes);
router.post("/enroll-etude", studentController.enroll_etude);
router.post("/release-etude", studentController.release_etude);
router.post("/create-request-etude", studentController.create_request_etude);
router.get("/all-student", studentController.all_student);
router.get("/get-notices/:student_id", studentController.get_notices);
// prettier-ignore
router.get("/etude-request-list/:student_id", studentController.etude_request_list);
// prettier-ignore
router.get("/etude-requests-by-lesson/:student_id", studentController.etude_requests_by_lesson);
// prettier-ignore
router.get("/etude-requests-by-teacher/:student_id", studentController.etude_requests_by_teacher);
// prettier-ignore
router.get("/etude-requests-by-private-status/:student_id", studentController.etude_requests_by_private_status);
// prettier-ignore
router.get("/etude-enrolled-for-lesson/:student_id", studentController.etude_enrolled_for_lesson);
// prettier-ignore
router.get("/etude-enrolled-for-teacher/:student_id", studentController.etude_enrolled_for_teacher);
// prettier-ignore
router.get("/etude-enrolled-for-private-status/:student_id", studentController.etude_enrolled_for_private_status);
// prettier-ignore
router.get("/etude-enrolled-for-attend-status/:student_id", studentController.etude_enrolled_for_attend_status);

module.exports = router;
