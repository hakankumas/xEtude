const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Models
const Home = require("./models/Home");
const Teacher = require("./models/Teacher");
const Student = require("./models/Student");
const Etude = require("./models/Etude");

// Login
app.post("/login", async (req, res) => {
    try {
        const user = await Home.login(req.body);
        if (user[0].length > 0) res.status(200).json({ user: user[0] });
        else res.status(401).json({ message: "Invalid username or password." });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.get("/teacher/work-hours/:id", async (req, res) => {
    const workhours = await Teacher.getAll_workHours(req.params.id);
    if (workhours[0].length > 0)
        res.status(200).json({ workhours: workhours[0] });
    else res.status(404).json({ message: "Not found." });
});

app.get("/student/active-etudes/:etude_class", async (req, res) => {
    const etudes = await Student.active_etudes(req.params.etude_class);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
});

app.get("/student/my-etudes/:student_id", async (req, res) => {
    const etudes = await Student.my_etudes(req.params.student_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
});

app.post("/student/enroll-etude", async (req, res) => {
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
});

app.post("/student/release-etude", async (req, res) => {
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
});

app.get("/teacher/all-teacher", async (req, res) => {
    const teachers = await Teacher.getAll();
    if (teachers[0].length > 0) res.status(200).json({ teachers: teachers[0] });
    else res.status(404).json({ message: "Not found." });
});

app.post("/student/create-request-etude", async (req, res) => {
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
});

app.get("/teacher/active-etudes/:teacher_id", async (req, res) => {
    const etudes = await Teacher.getById_etudes(req.params.teacher_id, 0);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
});

app.get("/teacher/request-etudes/:teacher_id", async (req, res) => {
    const etudes = await Teacher.getById_etudes(req.params.teacher_id, 1);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
});

app.get("/student/all-student", async (req, res) => {
    const students = await Student.getAll();
    if (students[0].length > 0) res.status(200).json({ students: students[0] });
    else res.status(404).json({ message: "Not found." });
});

app.post("/teacher/create-etude", async (req, res) => {
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
});

app.post("/teacher/update-request-etude", async (req, res) => {
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
});

app.post("/teacher/create-notice", async (req, res) => {
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
});

app.get("/teacher/get-notices/:etude_id", async (req, res) => {
    const notices = await Etude.getById_notices(req.params.etude_id);
    if (notices[0].length > 0) res.status(200).json({ notices: notices[0] });
    else res.status(404).json({ message: "Not found." });
});

app.get("/student/get-notices/:student_id", async (req, res) => {
    try {
        const notices = await Student.get_notices(req.params.student_id);
        if (notices[0].length > 0)
            res.status(200).json({ notices: notices[0] });
        else res.status(404).json({ message: "Not found." });
    } catch (error) {
        console.error("Get notices error:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
