const connection = require("../database/db");

module.exports = class Etude {
    static getById(id) {
        return connection.execute(
            `
            SELECT * 
            FROM etude 
            WHERE id = ?`,
            [id]
        );
    }
};
