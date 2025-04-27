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

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
