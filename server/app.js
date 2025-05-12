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

app.use("/", homeRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
