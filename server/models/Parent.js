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
    static getAllChildren(parent_id) {
        return connection.execute(
            `
            SELECT 
                family.id as family_id,
                
                student.id as student_id,
                student.name as student_name,
                student.surname as student_surname,
                student.class_number as student_class_number,
                
                parent.id as parent_id,
                parent.name as parent_name,
                parent.surname as parent_surname
            FROM family
            LEFT JOIN user as student ON family.student_id = student.id
            LEFT JOIN user as parent ON family.parent_id = parent.id
            WHERE parent.id = ?
            `,
            [parent_id]
        );
    }

    static student_etudes(student_id) {
        return connection.execute(
            `
            SELECT 
                etude_enroll.id as etude_enroll_id,
                etude.id as etude_id,
                teacher.id as teacher_id,
                teacher.name as teacher_name,
                teacher.surname as teacher_surname,
                lesson.name as lesson_name,
                etude.date_start as etude_date_start,
                etude.date_end as etude_date_end,
                etude.class_number as etude_class_number,
                etude.private_status as etude_private_status,
                etude.capacity as etude_capacity,
                etude_enroll.attend as etude_enroll_attend,
                CASE 
                    WHEN etude.date_start > CURDATE() THEN 'Henüz Başlamadı'
                    WHEN etude_enroll.attend = 1 THEN 'Katıldı'
                    ELSE 'Katılmadı'
                END AS etude_status
            FROM etude_enroll
            LEFT JOIN etude ON etude_enroll.etude_id = etude.id
            LEFT JOIN user as teacher ON etude.teacher_id = teacher.id
            LEFT JOIN lesson_teacher ON teacher.id = lesson_teacher.teacher_id
            LEFT JOIN lesson ON lesson_teacher.lesson_id = lesson.id
            WHERE student_id = ?
            ORDER BY etude.id DESC
            `,
            [student_id]
        );
    }
};
