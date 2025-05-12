const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Etude = require("../models/Etude");

exports.all_teacher = async (req, res) => {
    const teachers = await Teacher.getAll();
    if (teachers[0].length > 0) res.status(200).json({ teachers: teachers[0] });
    else res.status(404).json({ message: "Not found." });
};

// exports.work_hours = async (req, res) => {
//     const workhours = await Teacher.getAll_workHours(req.params.id);
//     if (workhours[0].length > 0)
//         res.status(200).json({ workhours: workhours[0] });
//     else res.status(404).json({ message: "Not found." });
// };

exports.active_etudes = async (req, res) => {
    const etudes = await Teacher.getById_etudes(req.params.teacher_id, 0);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.request_etudes = async (req, res) => {
    const etudes = await Teacher.getById_etudes(req.params.teacher_id, 1);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
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
