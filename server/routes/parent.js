const express = require("express");
const router = express.Router();

// Controllers
const parentController = require("../controllers/parentController");

router.get("/children-list/:parent_id", parentController.children_list);
router.get("/student-etudes/:student_id", parentController.student_etudes);
router.get(
    "/student-etudes-counts/:student_id",
    parentController.student_etudes_counts
);
router.get(
    "/student-enrolled-etudes/:student_id",
    parentController.student_enrolled_etudes
);
router.get(
    "/etude-notices-of-students/:student_id",
    parentController.etude_notices_of_students
);

module.exports = router;
