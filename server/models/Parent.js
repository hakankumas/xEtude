const connection = require("../database/db");

module.exports = class Parent {
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
    static counts_etude_by_student(student_id) {
        return connection.execute(
            `
            SELECT
                (SELECT COUNT(*) FROM etude WHERE request_from = ?) AS request_etudes_all,
                (SELECT COUNT(*) FROM etude WHERE request_from = ? AND private_status = 1) AS request_etudes_private,
                (SELECT COUNT(*) FROM etude WHERE request_from = ? AND private_status = 0) AS request_etudes_public,
                (SELECT COUNT(*) FROM etude WHERE request_from = ? AND request = 0) AS accepted_etudes,
                (SELECT COUNT(*) FROM etude WHERE request_from = ? AND request = 1) AS waiting_etudes,
                (SELECT COUNT(*) FROM etude_enroll WHERE student_id = ?) AS enroll_etudes,
                (SELECT COUNT(*) FROM etude_enroll WHERE student_id = ? AND attend = 1) AS attended_etudes,
                (SELECT COUNT(*) FROM etude_enroll LEFT JOIN etude ON etude_enroll.etude_id = etude.id WHERE student_id = ? AND attend = 0 AND etude.date_start < CURDATE()) AS not_attended_etudes
            `,
            [
                student_id,
                student_id,
                student_id,
                student_id,
                student_id,
                student_id,
                student_id,
                student_id,
            ]
        );
    }
    static enrolled_etudes_by_lessons(student_id) {
        return connection.execute(
            `
            SELECT 
                lesson.name as lesson_name,
                COUNT(etude_enroll.id) as count_enroll
            FROM etude_enroll
            LEFT JOIN etude ON etude_enroll.etude_id = etude.id
            LEFT JOIN user as teacher ON etude.teacher_id = teacher.id
            LEFT JOIN lesson_teacher ON teacher.id = lesson_teacher.teacher_id
            LEFT JOIN lesson ON lesson_teacher.lesson_id = lesson.id
            WHERE etude_enroll.student_id = ?
            GROUP BY lesson.id
            ORDER BY count_enroll DESC
            `,
            [student_id]
        );
    }
    static enrolled_etudes_by_teacher(student_id) {
        return connection.execute(
            `
            SELECT 
                teacher.name as teacher_name,
                teacher.surname as teacher_surname,
                COUNT(etude_enroll.id) as count_enroll
            FROM etude_enroll
            LEFT JOIN etude ON etude_enroll.etude_id = etude.id
            LEFT JOIN user as teacher ON etude.teacher_id = teacher.id
            LEFT JOIN lesson_teacher ON teacher.id = lesson_teacher.teacher_id
            LEFT JOIN lesson ON lesson_teacher.lesson_id = lesson.id
            WHERE etude_enroll.student_id = ?
            GROUP BY teacher.id
            ORDER BY count_enroll DESC
            `,
            [student_id]
        );
    }
    static etude_notices_of_students(student_id) {
        return connection.execute(
            `
            SELECT 
                etude_notice.id as etude_notice_id,
                etude.id as etude_id,
                lesson.id as lesson_id,
                lesson.name as lesson_name,
                teacher.id as teacher_id,
                teacher.name as teacher_name,
                teacher.surname as teacher_surname,
                etude.date_start as etude_date_start,
                etude.date_end as etude_date_end,
                etude.private_status as etude_private_status,
                etude_notice.notice as etude_notice_content,
                etude_notice.createdAt as etude_notice_createdAt
            FROM etude_notice
            LEFT JOIN etude ON etude_notice.etude_id = etude.id
            LEFT JOIN user as teacher ON etude.teacher_id = teacher.id
            LEFT JOIN lesson_teacher ON teacher.id = lesson_teacher.teacher_id
            LEFT JOIN lesson ON lesson_teacher.lesson_id = lesson.id
            WHERE etude_id IN (SELECT etude_enroll.etude_id
                FROM etude_enroll
                WHERE etude_enroll.student_id = ?)
            ORDER BY etude_notice.createdAt DESC
            `,
            [student_id]
        );
    }
    static notices_by_admin(parent_id) {
        return connection.execute(
            `
            SELECT 
                notice_admin.id as notice_id,
                admin.name as admin_name,
                admin.surname as admin_surname,
                notice_admin.content as content,
                notice_admin.createdAt as createdAt
            FROM notice_admin
            LEFT JOIN user as admin ON notice_admin.admin_id = admin.id
            WHERE parent_id = ?
            ORDER BY createdAt DESC
            `,
            [parent_id]
        );
    }
    static notices_by_teacher(parent_id) {
        return connection.execute(
            `
            SELECT 
                notice_teacher.id as notice_id,
                teacher.name as teacher_name,
                teacher.surname as teacher_surname,
                notice_teacher.content as content,
                notice_teacher.createdAt as createdAt
            FROM notice_teacher
            LEFT JOIN user as teacher ON notice_teacher.teacher_id = teacher.id
            WHERE parent_id = ?
            ORDER BY createdAt DESC
            `,
            [parent_id]
        );
    }
};
