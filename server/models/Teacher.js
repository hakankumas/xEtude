const connection = require("../database/db");

module.exports = class Teacher {
    static getById(id) {
        return connection.execute(
            `
            SELECT * 
            FROM user 
            WHERE 
                type = 2 AND 
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
                type = 2 AND 
                username = ?`,
            [username]
        );
    }
    static getAll() {
        return connection.execute(
            `
            SELECT * 
            FROM user 
            WHERE type = 2`
        );
    }
    static getAll_workHours(teacher_id) {
        return connection.execute(
            `
            SELECT *
            FROM teacher_workhours
            WHERE teacher_id = ?`,
            [teacher_id]
        );
    }
    static updateById_workHour(condition) {
        const { id, teacher_id, start, end } = condition;
        return connection.execute(
            `
            UPDATE teacher_workhours
            SET start = ?, end = ?
            WHERE id = ? AND teacher_id = ?`,
            [start, end, id, teacher_id]
        );
    }
};
