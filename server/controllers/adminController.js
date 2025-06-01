const Administrator = require("../models/Administrator");

exports.user_types = async (req, res) => {
    const datas = await Administrator.user_types();
    if (datas[0].length > 0) res.status(200).json({ datas: datas[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.create_notice_for_parent = async (req, res) => {
    try {
        const result = await Administrator.insert_notice_for_parent(req.body);
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

exports.count_etude_by_lessons = async (req, res) => {
    const etudes = await Administrator.count_etude_by_lessons();
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.count_etude_by_teachers = async (req, res) => {
    const etudes = await Administrator.count_etude_by_teachers();
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.count_etude_by_class_number = async (req, res) => {
    const etudes = await Administrator.count_etude_by_class_number();
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
};
