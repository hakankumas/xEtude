const connection = require("../database/db");

module.exports = class Student {
    // Student Login
    static get(where) {
        const { username, password } = where;
        return connection.execute(
            "SELECT * FROM student WHERE username =? AND password =?",
            [username, password]
        );
    }
    // Get All Students
    static getAll() {
        return connection.execute("SELECT * FROM student");
    }
};
