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
            WHERE type = 3
            ORDER BY name ASC, surname ASC`
        );
    }
    static active_etudes(etude_class) {
        return connection.execute(
            `
            SELECT 
                etude.id as etude_id,
                
                teacher.id as teacher_id,
                teacher.username as teacher_username,
                teacher.name as teacher_name,
                teacher.surname as teacher_surname,
                
                lesson.id as lesson_id,
                lesson.name as lesson_name,

                etude.date_start as etude_date_start,
                etude.date_end as etude_date_end,
                etude.class_number as etude_class,
                etude.private_status as etude_private,
                etude.capacity as etude_capacity,

				etude_join.number_of_etude_join
            FROM etude
            LEFT JOIN user as teacher ON etude.teacher_id = teacher.id
            LEFT JOIN lesson_teacher ON teacher.id = lesson_teacher.teacher_id
            LEFT JOIN lesson ON lesson.id = lesson_teacher.lesson_id
            LEFT JOIN (
                SELECT etude_enroll.etude_id, COUNT(*) as number_of_etude_join
                FROM etude_enroll
                GROUP BY etude_enroll.etude_id
            ) as etude_join ON etude_join.etude_id = etude.id
            WHERE 
                etude.request = 0 AND
                etude.private_status = 0 AND
                etude.class_number = ?
        `,
            [etude_class]
        );
    }
    static my_etudes(student_id) {
        return connection.execute(
            `
            SELECT etude_id
            FROM etude_enroll
            WHERE 
                student_id = ?
        `,
            [student_id]
        );
    }
    static enroll_etude(condition) {
        const { etude_id, student_id } = condition;
        return connection.execute(
            `
            INSERT INTO etude_enroll (etude_id, student_id)
            VALUES (?, ?)
        `,
            [etude_id, student_id]
        );
    }
    static release_etude(condition) {
        const { etude_id, student_id } = condition;
        return connection.execute(
            `
            DELETE FROM etude_enroll
            WHERE 
                etude_id = ? AND
                student_id = ?
        `,
            [etude_id, student_id]
        );
    }
    static getEtudeEnrollById(etude_enroll_id) {
        return connection.execute(
            `
            SELECT * 
            FROM etude_enroll 
            WHERE id = ?`,
            [etude_enroll_id]
        );
    }
    static getEtudeReleaseById(condition) {
        const { etude_id, student_id } = condition;
        return connection.execute(
            `
            SELECT * 
            FROM etude_enroll 
            WHERE 
                etude_id = ? AND 
                student_id = ?
            `,
            [etude_id, student_id]
        );
    }
    static create_request_etude(condition) {
        const {
            teacher_id,
            date_start,
            date_end,
            class_number,
            private_status,
            capacity,
            request,
            request_from,
        } = condition;
        return connection.execute(
            `
            INSERT INTO etude (
                teacher_id,
                date_start,
                date_end,
                class_number,
                private_status,
                capacity,
                request,
                request_from 
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [
                teacher_id,
                date_start,
                date_end,
                class_number,
                private_status,
                capacity,
                request,
                request_from,
            ]
        );
    }
};
