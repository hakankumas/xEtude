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
    static getById_etudes(teacher_id, request_status) {
        return connection.execute(
            `
            SELECT 
                etude.id as etude_id,
                etude.teacher_id as teacher_id,
                
                etude.date_start as etude_date_start,
                etude.date_end as etude_date_end,
                etude.class_number as etude_class_number,
                etude.private_status as etude_private_status,
                etude.capacity as etude_capacity,
                etude.request as etude_request,
                
                student.id as student_id,
                student.name as student_name,
                student.surname as student_surname
            FROM etude
            LEFT JOIN user as student ON etude.request_from = student.id
            WHERE 
                etude.request = ? AND
                etude.teacher_id = ?
            `,
            [request_status, teacher_id]
        );
    }
};
