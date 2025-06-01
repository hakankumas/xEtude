import axios from "axios";
import { useEffect, useState } from "react";
function NoticesByTeacher({ parent_id }) {
    console.log("NoticesByTeacher rendered.");
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/parent/notices-by-teacher/${parent_id}`)
            .then((res) => {
                setNotices(res.data.notices);
            });
    }, [parent_id]);
    return (
        <div className="shadow rounded-4 p-3">
            <h2>Öğretmen Bildirimleri</h2>
            <table className="table table-responsive table-hover">
                <thead className="text-center">
                    <tr>
                        <th>Bildirim ID</th>
                        <th>Öğretmen</th>
                        <th>Metin</th>
                        <th>Tarih</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {notices.length > 0 &&
                        notices.map((notice, index) => {
                            return (
                                // prettier-ignore
                                <tr key={index}>
                                    <td style={{width: "15%"}}>{notice.notice_id}</td>
                                    <td style={{width: "25%"}}>{notice.teacher_name + " " + notice.teacher_surname}</td>
                                    <td className="text-start">{notice.content}</td>
                                    <td style={{width: "20%"}}>
                                        {new Date(notice.createdAt).toLocaleDateString('tr-TR', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default NoticesByTeacher;
