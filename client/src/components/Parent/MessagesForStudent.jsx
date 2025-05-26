import axios from "axios";
import { useEffect, useState } from "react";
function MessagesForStudent({ student_id }) {
    console.log("MessagesForStudent rendered.");
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/parent/etude-notices-of-students/${student_id}`
            )
            .then((res) => {
                setNotices(res.data.notices);
            });
    }, [student_id]);
    return (
        <div>
            <div className="h3 fw-bold mb-4 d-flex justify-content-center">
                Öğrenciye Gelen Bildirimler
            </div>
            <table className="table table-hover">
                <thead>
                    <tr className="text-center">
                        <th style={{ width: "10%" }}>Etüt ID</th>
                        <th style={{ width: "15%" }}>Ders</th>
                        <th style={{ width: "15%" }}>Öğretmen</th>
                        <th style={{ width: "35%" }} className="text-start">
                            Bildirim Metni
                        </th>
                        <th style={{ width: "25%" }}>Tarih</th>
                    </tr>
                </thead>
                <tbody>
                    {notices &&
                        notices.map((notice, index) => (
                            <tr key={index} className="text-center">
                                <td>{notice.etude_id}</td>
                                <td>{notice.lesson_name}</td>
                                <td>{`${notice.teacher_name} ${notice.teacher_surname}`}</td>
                                <td className="text-start">
                                    {notice.etude_notice_content}
                                </td>
                                <td>
                                    {new Date(
                                        notice.etude_notice_createdAt
                                    ).toLocaleDateString("tr-TR", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}{" "}
                                    -{" "}
                                    {new Date(
                                        notice.etude_notice_createdAt
                                    ).toLocaleTimeString("tr-TR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default MessagesForStudent;
