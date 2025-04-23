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

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
