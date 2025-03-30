const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
