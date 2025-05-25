const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const homeRoutes = require("./routes/home");
const teacherRoutes = require("./routes/teacher");
const studentRoutes = require("./routes/student");
const Teacher = require("./models/Teacher");
const Student = require("./models/Student");
const Parent = require("./models/Parent");

app.use("/", homeRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);

app.get("/parent/children-list/:parent_id", async (req, res) => {
    const children = await Parent.getAllChildren(req.params.parent_id);
    if (children[0].length > 0) res.status(200).json({ children: children[0] });
    else res.status(404).json({ message: "Not found." });
});

app.get("/parent/student-etudes/:student_id", async (req, res) => {
    const etudes = await Parent.student_etudes(req.params.student_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
});

app.get("/parent/student-etudes-counts/:student_id", async (req, res) => {
    const etudes = await Parent.counts_etude_by_student(req.params.student_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
});

app.get("/parent/student-enrolled-etudes/:student_id", async (req, res) => {
    const etudes = await Parent.enrolled_etudes_by_lessons(
        req.params.student_id
    );
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
