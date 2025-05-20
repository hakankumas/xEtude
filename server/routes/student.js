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

module.exports = router;
