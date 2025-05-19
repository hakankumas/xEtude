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
    static getById(id) {
        return connection.execute(
            `
            SELECT * FROM user WHERE id = ?
            `,
            [id]
        );
    }
    static updateById(condition) {
        const { id, password } = condition;
        return connection.execute(
            `
            UPDATE user
            SET password = ?
            WHERE id = ?
            `,
            [password, id]
        );
    }
};
