const Student = require("../models/Student");

exports.active_etudes = async (req, res) => {
    const etudes = await Student.active_etudes(req.params.etude_class);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.etude_history = async (req, res) => {
    const etudes = await Student.etude_history(req.params.user_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.my_etudes = async (req, res) => {
    const etudes = await Student.my_etudes(req.params.student_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.enroll_etude = async (req, res) => {
    try {
        const result = await Student.enroll_etude(req.body);

        if (result[0].affectedRows > 0) {
            const newDataId = result[0].insertId;
            const newData = await Student.getEtudeEnrollById(newDataId);

            res.status(200).json({
                message: "Etude enrolled successfully.",
                newData: newData[0][0],
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (err) {
        console.error("Enroll etude error:", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.release_etude = async (req, res) => {
    try {
        const releaseData = await Student.getEtudeReleaseById(req.body);
        const result = await Student.release_etude(req.body);

        if (result[0].affectedRows > 0) {
            res.status(200).json({
                message: "Etude released successfully.",
                releaseData: releaseData[0][0],
            });
        } else res.status(404).json({ message: "Not found." });
    } catch (err) {
        console.error("Release etude error:", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.create_request_etude = async (req, res) => {
    try {
        const result = await Student.create_request_etude(req.body);
        if (result[0].affectedRows > 0) {
            res.status(200).json({
                message: "Etude request created successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (err) {
        console.error("Create request etude error:", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.all_student = async (req, res) => {
    const students = await Student.getAll();
    if (students[0].length > 0) res.status(200).json({ students: students[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.get_notices = async (req, res) => {
    try {
        const notices = await Student.get_notices(req.params.student_id);
        if (notices[0].length > 0)
            res.status(200).json({ notices: notices[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        console.error("Get notices error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};
