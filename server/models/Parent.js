const connection = require("../database/db");

module.exports = class Parent {
    static getById(id) {
        return connection.execute(
            `
            SELECT * 
            FROM user 
            WHERE 
                type = 4 AND 
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
                type = 4 AND 
                username = ?`,
            [username]
        );
    }
    static getAll() {
        return connection.execute(
            `
            SELECT * 
            FROM user 
            WHERE type = 4`
        );
    }
    static getAllChildren(id) {
        return connection.execute(
            `
            SELECT 
                family.id as family_id,

                user_parent.id as parent_id,
                user_parent.username as parent_username,
                user_parent.name as parent_name,
                user_parent.surname as parent_surname,

                user_student.id as student_id,
                user_student.username as student_username,
                user_student.name as student_name,
                user_student.surname as student_surname

            FROM family
            INNER JOIN user AS user_student ON family.student_id = user_student.id
            INNER JOIN user AS user_parent ON family.parent_id = user_parent.id
            WHERE parent = ?`,
            [id]
        );
    }
};
