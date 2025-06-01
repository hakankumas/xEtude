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
};
