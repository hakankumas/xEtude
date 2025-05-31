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
const parentRoutes = require("./routes/parent");

const Teacher = require("./models/Teacher");
const Student = require("./models/Student");
const Parent = require("./models/Parent");

app.use("/", homeRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);
app.use("/parent", parentRoutes);

app.get("/teacher/etudes-counts/:teacher_id", async (req, res) => {
    const etudes = await Teacher.etudes_counts(req.params.teacher_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
});
app.get("/teacher/etudes-by-class-number/:teacher_id", async (req, res) => {
    const etudes = await Teacher.etudes_by_class_number(req.params.teacher_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
});
app.get("/teacher/etudes-by-students/:teacher_id", async (req, res) => {
    const etudes = await Teacher.etudes_by_students(req.params.teacher_id);
    if (etudes[0].length > 0) res.status(200).json({ etudes: etudes[0] });
    else res.status(404).json({ message: "Not found." });
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
