const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Etude = require("../models/Etude");

exports.all_teacher = async (req, res) => {
    const teachers = await Teacher.getAll();
    if (teachers[0].length > 0) res.status(200).json({ teachers: teachers[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.active_etudes = async (req, res) => {
    const etudes = await Teacher.active_etudes_getByTeacherId(
        req.params.teacher_id
    );
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.request_etudes = async (req, res) => {
    const etudes = await Teacher.request_etudes_getByTeacherId(
        req.params.teacher_id
    );
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.attend_etudes_teacher = async (req, res) => {
    const attends_teacher = await Teacher.attend_etudes_getByTeacherId(
        req.params.teacher_id
    );
    if (attends_teacher[0].length > 0)
        res.status(200).json({ attends_teacher: attends_teacher[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.attend_etudes_etude = async (req, res) => {
    const attends_etude = await Teacher.attend_etudes_getByEtudeId(
        req.params.etude_id
    );
    if (attends_etude[0].length > 0)
        res.status(200).json({ attends_etude: attends_etude[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.update_attend_etude = async (req, res) => {
    try {
        const result = await Teacher.update_attend_etude(req.body);
        if (result[0].affectedRows > 0) {
            res.status(200).json({
                message: "Etude updated successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (err) {
        console.error("Update attend etude error:", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.create_etude = async (req, res) => {
    try {
        if (req.body.private_status == 1) {
            const student = await Student.getById(req.body.private_student);
            const student_class_number = student[0][0].class_number;
            const result = await Teacher.create_etude_private(
                req.body,
                student_class_number
            );
            if (result[0].affectedRows > 0) {
                const condition = {
                    etude_id: result[0].insertId,
                    student_id: req.body.private_student,
                };
                const student_enroll = await Student.enroll_etude(condition);
                if (student_enroll[0].affectedRows > 0) {
                    res.status(200).json({
                        message: "Etude created and enrolled successfully.",
                    });
                }
            } else {
                res.status(404).json({ message: "Not found." });
            }
        }
        if (req.body.private_status == 0) {
            const result = await Teacher.create_etude_public(req.body);
            if (result[0].affectedRows > 0) {
                res.status(200).json({
                    message: "Etude created successfully.",
                });
            } else {
                res.status(404).json({ message: "Not found." });
            }
        }
    } catch (err) {
        console.error("Create etude error:", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.update_request_etude = async (req, res) => {
    try {
        const result = await Teacher.update_request_etude(req.body);
        if (result[0].affectedRows > 0) {
            const updatedEtude = await Etude.getById(req.body.etude_id);
            if (updatedEtude[0].length > 0) {
                const condition = {
                    etude_id: updatedEtude[0][0].id,
                    student_id: updatedEtude[0][0].request_from,
                };
                const enroll_etude = await Student.enroll_etude(condition);
                if (enroll_etude[0].affectedRows > 0) {
                    res.status(200).json({
                        message:
                            "Etude request updated successfully and student enrolled.",
                        etude: updatedEtude[0][0],
                    });
                }
            }
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (err) {
        console.error("Create request etude error:", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.create_notice = async (req, res) => {
    try {
        const result = await Etude.insert_notice(req.body);
        if (result[0].affectedRows > 0) {
            res.status(200).json({
                message: "Notice created successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (err) {
        console.error("Create request etude error:", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.get_notices = async (req, res) => {
    const notices = await Etude.getById_notices(req.params.etude_id);
    if (notices[0].length > 0) res.status(200).json({ notices: notices[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.etudes_counts = async (req, res) => {
    const etudes = await Teacher.etudes_counts(req.params.teacher_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};
exports.etudes_by_class_number = async (req, res) => {
    const etudes = await Teacher.etudes_by_class_number(req.params.teacher_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};
exports.request_etudes_by_students = async (req, res) => {
    const etudes = await Teacher.request_etudes_by_students(
        req.params.teacher_id
    );
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};
exports.etudes_attend_status = async (req, res) => {
    const etudes = await Teacher.etudes_attend_status(req.params.teacher_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};
exports.enrolled_etudes_by_students = async (req, res) => {
    const etudes = await Teacher.enrolled_etudes_by_students(
        req.params.teacher_id
    );
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};
