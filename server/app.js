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

const Administrator = require("./models/Administrator");
const Teacher = require("./models/Teacher");
const Student = require("./models/Student");
const Parent = require("./models/Parent");

app.use("/", homeRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);
app.use("/parent", parentRoutes);

app.get("/admin/user-types", async (req, res) => {
    const datas = await Administrator.user_types();
    if (datas[0].length > 0) res.status(200).json({ datas: datas[0] });
    else res.status(404).json({ message: "Not found." });
});

app.get("/parent/notices-by-admin/:parent_id", async (req, res) => {
    const notices = await Parent.notices_by_admin(req.params.parent_id);
    if (notices[0].length > 0) res.status(200).json({ notices: notices[0] });
    else res.status(404).json({ message: "Not found." });
});

app.get("/parent/notices-by-teacher/:parent_id", async (req, res) => {
    const notices = await Parent.notices_by_teacher(req.params.parent_id);
    if (notices[0].length > 0) res.status(200).json({ notices: notices[0] });
    else res.status(404).json({ message: "Not found." });
});

app.post("/teacher/create-notice-for-parent", async (req, res) => {
    try {
        const result = await Teacher.insert_notice_for_parent(req.body);
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

app.post("/admin/create-notice-for-parent", async (req, res) => {
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
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
