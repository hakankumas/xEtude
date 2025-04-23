const connection = require("../database/db");

module.exports = class Home {
    // Login
    static login(where) {
        const { username, password } = where;
        return connection.execute(
            `
            SELECT * FROM user WHERE username =? AND password =?`,
            [username, password]
        );
    }
};
