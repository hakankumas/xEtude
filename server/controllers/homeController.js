const Home = require("../models/Home");

exports.login = async (req, res) => {
    try {
        const user = await Home.login(req.body);
        if (user[0].length > 0) res.status(200).json({ user: user[0] });
        else res.status(401).json({ message: "Invalid username or password." });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

exports.getById = async (req, res) => {
    const user = await Home.getById(req.params.id);
    if (user[0].length > 0) res.status(200).json({ user: user[0] });
    else res.status(404).json({ message: "Not found." });
};

exports.updateById = async (req, res) => {
    try {
        const result = await Home.updateById(req.body);
        if (result[0].affectedRows > 0) {
            res.status(200).json({
                message: "User updated successfully.",
            });
        } else {
            res.status(404).json({ message: "Not found." });
        }
    } catch (err) {
        console.error("Update user by id error:", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};
