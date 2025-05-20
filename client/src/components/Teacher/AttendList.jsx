import axios from "axios";
import { useEffect, useState } from "react";
function AttendList() {
    console.log("AttendList worked.");
    const teacher_id = localStorage.getItem("user_id");
    const [etudes, setEtudes] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/teacher/attend-etudes-teacher/${teacher_id}`
            )
            .then((res) => {
                setEtudes(res.data.attends_teacher);
            });
    }, []);
    return (
        <div className="col-6">
            <table className="table table-hover">
                <thead className="text-center">
                    <tr>
                        <th>Etüt ID</th>
                        <th>Sınıf</th>
                        <th>Etüt Türü</th>
                        <th>Kapasite</th>
                        <th>Tarih</th>
                        <th>Saat</th>
                        <th>Yoklama</th>
                    </tr>
                </thead>
                <tbody>
                    {etudes.length > 0 &&
                        etudes.map((etude, index) => {
                            return (
                                // prettier-ignore
                                <tr key={index} className="text-center">
                                    <td>{etude.etude_id}</td>
                                    <td>{`${etude.class_number}. Sınıf`}</td>
                                    <td>{etude.private_status == 1 ? "Özel Etüt" : "Toplu Etüt"}</td>
                                    <td>{etude.capacity}</td>
                                    <td>{new Date(etude.date_start).toLocaleDateString('tr-TR')}</td>
                                    <td>{new Date(etude.date_start).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) }-{new Date(etude.date_end).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td><a href={`/attend-list/${etude.etude_id}`} className="btn btn-primary">Yoklama Al</a></td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default AttendList;
