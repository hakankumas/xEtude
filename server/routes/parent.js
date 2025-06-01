const express = require("express");
const router = express.Router();

// Controllers
const parentController = require("../controllers/parentController");

router.get("/getall", parentController.getAll);
router.get("/children-list/:parent_id", parentController.children_list);
router.get("/student-etudes/:student_id", parentController.student_etudes);
// prettier-ignore
router.get("/student-etudes-counts/:student_id", parentController.student_etudes_counts);
// prettier-ignore
router.get("/student-enrolled-etudes-by-lesson/:student_id", parentController.student_enrolled_etudes_by_lesson);
// prettier-ignore
router.get("/student-enrolled-etudes-by-teacher/:student_id", parentController.student_enrolled_etudes_by_teacher);
// prettier-ignore
router.get("/etude-notices-of-students/:student_id", parentController.etude_notices_of_students);
// prettier-ignore
router.get("/notices-by-admin/:parent_id", parentController.notices_by_admin);
// prettier-ignore
router.get("/notices-by-teacher/:parent_id", parentController.notices_by_teacher);
// prettier-ignore
router.get("/all-parents", parentController.all_parents);

module.exports = router;
