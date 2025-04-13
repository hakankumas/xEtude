const connection = require("../database/db");

module.exports = class User {
    // A user
    static get(where) {
        const { username, password } = where;
        return connection.execute(
            "SELECT * FROM user WHERE username =? AND password =?",
            [username, password]
        );
    }

    // All of Users
    static getall() {
        return connection.execute("SELECT * FROM user");
    }
};
