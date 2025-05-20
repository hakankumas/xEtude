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
    static getAll() {
        return connection.execute(
            `
            SELECT * 
            FROM user 
            WHERE type = 2
            ORDER BY name ASC, surname ASC`
        );
    }
    static active_etudes_getByTeacherId(teacher_id) {
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
                etude.request = 0 AND
                etude.teacher_id = ? AND
                etude.date_start >= CURDATE()
            ORDER BY etude.date_start ASC
            `,
            [teacher_id]
        );
    }
    static request_etudes_getByTeacherId(teacher_id) {
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
                etude.request = 1 AND
                etude.teacher_id = 17
            ORDER BY etude.id DESC
            `,
            [teacher_id]
        );
    }
    static attend_etudes_getByTeacherId(teacher_id) {
        return connection.execute(
            `
            SELECT 
                id as etude_id, 
                teacher_id, 
                date_start,
                date_end,
                class_number,
                private_status,
                capacity
            FROM etude
            WHERE 
                teacher_id = ? AND
                date_start <= CURDATE()
            ORDER BY id DESC;
            `,
            [teacher_id]
        );
    }
    static attend_etudes_getByEtudeId(etude_id) {
        return connection.execute(
            `
            SELECT 
                etude.id as etude_id,
                etude.teacher_id as teacher_id,
                etude.date_start as date_start,
                etude_enroll.id as etude_enroll_id,
                etude_enroll.student_id as student_id,
                student.name as student_name,
                student.surname as student_surname,
                etude_enroll.attend as attend
            FROM etude_enroll
            LEFT JOIN etude ON etude_enroll.etude_id = etude.id
            LEFT JOIN user as student ON etude_enroll.student_id = student.id
            WHERE etude.id = ?
            `,
            [etude_id]
        );
    }
    static update_attend_etude(condition) {
        const { etude_id, student_id, attend_status } = condition;
        return connection.execute(
            `
            UPDATE etude_enroll
            SET attend = ?
            WHERE 
                etude_id = ? AND
                student_id = ?
            `,
            [attend_status, etude_id, student_id]
        );
    }
    static create_etude_private(condition, student_class_number) {
        const { teacher_id, date_start, date_end, private_status, capacity } =
            condition;
        return connection.execute(
            `
            INSERT INTO etude (
                teacher_id,
                date_start,
                date_end,
                private_status,
                capacity,
                class_number
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                teacher_id,
                date_start,
                date_end,
                private_status,
                capacity,
                student_class_number,
            ]
        );
    }
    static create_etude_public(condition) {
        const {
            teacher_id,
            date_start,
            date_end,
            private_status,
            class_number,
            capacity,
        } = condition;
        return connection.execute(
            `
            INSERT INTO etude (
                teacher_id,
                date_start,
                date_end,
                private_status,
                class_number,
                capacity
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                teacher_id,
                date_start,
                date_end,
                private_status,
                class_number,
                capacity,
            ]
        );
    }
    static update_request_etude(condition) {
        const { etude_id, date_start, date_end, capacity } = condition;
        return connection.execute(
            `
            UPDATE etude
            SET 
                date_start = ?, 
                date_end = ?,
                capacity = ?,
                request = 0
            WHERE id = ?
            `,
            [date_start, date_end, capacity, etude_id]
        );
    }
};
