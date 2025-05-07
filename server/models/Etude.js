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
    static insert_notice(condition) {
        const { etude_id, notice } = condition;
        return connection.execute(
            `
            INSERT INTO etude_notice(etude_id, notice)
            VALUES (?, ?)
            `,
            [etude_id, notice]
        );
    }
    static getById_notices(etude_id) {
        return connection.execute(
            `
            SELECT * 
            FROM etude_notice 
            WHERE etude_id = ?`,
            [etude_id]
        );
    }
};
