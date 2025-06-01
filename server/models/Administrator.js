const connection = require("../database/db");

module.exports = class Administrator {
    static user_types() {
        return connection.execute(
            `
            SELECT
                (SELECT COUNT(*) FROM user WHERE type = 2 GROUP BY type) as type_teacher,
                (SELECT COUNT(*) FROM user WHERE type = 3 GROUP BY type) as type_student,
                (SELECT COUNT(*) FROM user WHERE type = 4 GROUP BY type) as type_parent,
                (SELECT COUNT(*) FROM etude) as total_etude,
                (SELECT COUNT(*) FROM etude_enroll) as total_etude_enroll,
                (SELECT COUNT(*) FROM etude WHERE request_from IS NOT NULL) as total_etude_request
            `
        );
    }
    static insert_notice_for_parent(condition) {
        const { admin_id, parent_id, content } = condition;
        return connection.execute(
            `
            INSERT INTO notice_admin (admin_id, parent_id, content)
            VALUES (?, ?, ?)
            `,
            [admin_id, parent_id, content]
        );
    }
    static count_etude_by_lessons() {
        return connection.execute(
            `
            SELECT
                lesson.id as lesson_id,
                lesson.name as lesson_name,
                COUNT(etude.id) as count
            FROM etude
            LEFT JOIN user as teacher ON etude.teacher_id = teacher.id
            LEFT JOIN lesson_teacher ON teacher.id = lesson_teacher.teacher_id
            LEFT JOIN lesson ON lesson_teacher.lesson_id = lesson.id
            GROUP BY lesson.id
            ORDER BY count DESC
            `
        );
    }
    static count_etude_by_teachers() {
        return connection.execute(
            `
            SELECT
                teacher.id as teacher_id,
                teacher.name as teacher_name,
                teacher.surname as teacher_surname,
                COUNT(etude.id) as count
            FROM etude
            LEFT JOIN user as teacher ON etude.teacher_id = teacher.id
            GROUP BY teacher_id
            ORDER BY count DESC
            `
        );
    }
    static count_etude_by_class_number() {
        return connection.execute(
            `
            SELECT 
                CASE 
                    WHEN class_number = 1 THEN '1. Sınıf'
                    WHEN class_number = 2 THEN '2. Sınıf'
                    WHEN class_number = 3 THEN '3. Sınıf'
                    WHEN class_number = 4 THEN '4. Sınıf'
                END AS class_number_rate,
                COUNT(*) as count
            FROM etude
            GROUP BY class_number
            ORDER BY count DESC
            `
        );
    }
};
