import axios from "axios";
import { useEffect, useState } from "react";

function EtudesHistory({ student_id }) {
    console.log("EtudesHistory rendered.");
    const [etudes, setEtudes] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/parent/student-etudes/${student_id}`)
            .then((res) => {
                setEtudes(res.data.etudes);
            });
    }, [student_id]);

    return (
        <div className="shadow rounded-4 p-3">
            <h1>Etüt Kayıtları</h1>
            <table className="table table-responsive table-hover">
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
                <tbody className="text-center">
                    {etudes.length > 0 &&
                        etudes.map((etude, index) => {
                            return (
                                // prettier-ignore
                                <tr key={index}>
                                    <td>{etude.etude_id}</td>
                                    <td>{etude.lesson_name}</td>
                                    <td>{etude.teacher_name + " " + etude.teacher_surname}</td>
                                    <td>{etude.etude_private_status == 1 ? "Özel Etüt" : "Toplu Etüt"}</td>
                                    <td>{new Date(etude.etude_date_start).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                                    <td>{new Date(etude.etude_date_start).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) }-{new Date(etude.etude_date_end).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td className={
                                        etude.etude_status=="Katıldı" 
                                        ? "text-success" 
                                        : etude.etude_status=="Katılmadı" 
                                            ? "text-danger" 
                                            : "text-primary"
                                        }>{etude.etude_status}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default EtudesHistory;
