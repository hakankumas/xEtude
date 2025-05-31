const Parent = require("../models/Parent");

exports.children_list = async (req, res) => {
    const children = await Parent.getAllChildren(req.params.parent_id);
    if (children[0].length > 0) res.status(200).json({ children: children[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.student_etudes = async (req, res) => {
    const etudes = await Parent.student_etudes(req.params.student_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.student_etudes_counts = async (req, res) => {
    const etudes = await Parent.counts_etude_by_student(req.params.student_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.student_enrolled_etudes = async (req, res) => {
    const etudes = await Parent.enrolled_etudes_by_lessons(
        req.params.student_id
    );
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.etude_notices_of_students = async (req, res) => {
    const notices = await Parent.etude_notices_of_students(
        req.params.student_id
    );
    if (notices[0].length > 0) res.status(200).json({ notices: notices[0] });
    else res.status(404).json({ message: "Not found." });
};
