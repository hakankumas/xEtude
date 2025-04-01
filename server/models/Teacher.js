const connection = require("../database/db");

module.exports = class Teacher {
    // Teacher Login
    static get(where) {
        const { username, password } = where;
        return connection.execute(
            "SELECT * FROM teacher WHERE username =? AND password =?",
            [username, password]
        );
    }
    // Get All Teachers
    static getAll() {
        return connection.execute("SELECT * FROM teacher");
    }
};
