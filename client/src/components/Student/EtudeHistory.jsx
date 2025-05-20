import axios from "axios";
import { useEffect, useState } from "react";
function EtudeHistory() {
    console.log("EtudeHistory rendered");
    const student_id = localStorage.getItem("user_id");
    const [etudes, setEtudes] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/student/etude-history/${student_id}`)
            .then((res) => {
                setEtudes(res.data.etudes);
            });
    }, []);
    return (
        <div className="col-6">
            <table className="table table-hover">
                <thead className="text-center">
                    <tr>
                        <th>Etüt ID</th>
                        <th>Ders</th>
                        <th>Öğretmen</th>
                        <th>Etüt Türü</th>
                        <th>Tarih</th>
                        <th>Saat</th>
                        <th>Katılım Durumu</th>
                    </tr>
                </thead>
                <tbody>
                    {etudes.length > 0 &&
                        etudes.map((etude, index) => {
                            return (
                                // prettier-ignore
                                <tr key={index} className="text-center">
                                    <td>{etude.etude_id}</td>
                                    <td>{etude.lesson_name}</td>
                                    <td>{etude.teacher_name + " " + etude.teacher_surname}</td>
                                    <td>{etude.etude_private_status == 1 ? "Özel Etüt" : "Toplu Etüt"}</td>
                                    <td>{new Date(etude.etude_date_start).toLocaleDateString('tr-TR')}</td>
                                    <td>{new Date(etude.etude_date_start).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) }-{new Date(etude.etude_date_end).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td className={etude.etude_enroll_attend == 1 ? "text-success" : "text-danger"}>{etude.etude_enroll_attend == 1 ? "Katıldınız" : "Katılmadınız"}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default EtudeHistory;
