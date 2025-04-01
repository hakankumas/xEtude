const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const Student = require("./models/Student");
const Parent = require("./models/Parent");
const Teacher = require("./models/Teacher");
const Admin = require("./models/Admin");

app.get("/", (req, res) => {
    res.send("Hello There! Welcome to the server.");
});

// Login
app.post("/login", async (req, res) => {
    const { username, password, login_type } = req.body;
    if (login_type) {
        switch (login_type) {
            case "student":
                const student = await Student.get(req.body);
                if (student[0] != false) res.status(200).json(student[0]);
                else
                    res.status(401).json({
                        message: "Invalid username or password",
                    });
                break;
            case "parent":
                const parent = await Parent.get(req.body);
                if (parent[0] != false) res.status(200).json(parent[0]);
                else
                    res.status(401).json({
                        message: "Invalid username or password",
                    });
                break;
            case "teacher":
                const teacher = await Teacher.get(req.body);
                if (teacher[0] != false) res.status(200).json(teacher[0]);
                else
                    res.status(401).json({
                        message: "Invalid username or password",
                    });
                break;
            case "admin":
                const admin = await Admin.get(req.body);
                if (admin[0] != false) res.status(200).json(admin[0]);
                else
                    res.status(401).json({
                        message: "Invalid username or password",
                    });
                break;
            default:
                console.log("Invalid login type");
                break;
        }
    }
});

app.get("/admin/", async (req, res) => {
    const students = await Student.getAll();
    const parents = await Parent.getAll();
    const teachers = await Teacher.getAll();
    const admins = await Admin.getAll();
    res.status(200).json({
        students: students[0],
        parents: parents[0],
        teachers: teachers[0],
        admins: admins[0],
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
