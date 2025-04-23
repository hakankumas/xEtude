const connection = require("../database/db");

module.exports = class Student {
    static getById(id) {
        return connection.execute(
            `
            SELECT * 
            FROM user 
            WHERE 
                type = 3 AND 
                id = ?`,
            [id]
        );
    }
    static getByUsername(username) {
        return connection.execute(
            `
            SELECT * 
            FROM user 
            WHERE 
                type = 3 AND 
                username = ?`,
            [username]
        );
    }
    static getAll() {
        return connection.execute(
            `
            SELECT * 
            FROM user 
            WHERE type = 3`
        );
    }
};
