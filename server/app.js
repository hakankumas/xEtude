const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Ana Sayfa");
});

app.get("/admin/login", (req, res) => {
    res.send("get/admin/login");
});
app.post("/admin/login", (req, res) => {
    res.send("post/admin/login");
});

// Teacher
// app.get("/teacher/login", (req, res) => {
//     res.send("get/teacher/login");
// });
// app.post("/teacher/login", (req, res) => {
//     res.send("post/teacher/login");
// });

// Student
// app.get("/student/login", (req, res) => {
//     res.send("get/student/login");
// });
// app.post("/student/login", (req, res) => {
//     res.send("post/student/login");
// });

// Parent
// app.get("/parent/login", (req, res) => {
//     res.send("get/parent/login");
// });
// app.post("/parent/login", (req, res) => {
//     res.send("post/parent/login");
// });

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
