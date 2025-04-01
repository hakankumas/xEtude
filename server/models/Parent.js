const connection = require("../database/db");

module.exports = class Parent {
    // Parent Login
    static get(where) {
        const { username, password } = where;
        return connection.execute(
            "SELECT * FROM parent WHERE username =? AND password =?",
            [username, password]
        );
    }
    // Get All Parents
    static getAll() {
        return connection.execute("SELECT * FROM parent");
    }
};
