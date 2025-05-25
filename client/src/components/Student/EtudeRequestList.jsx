import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function EtudeRequestList() {
    console.log("EtudeRequestList rendered");
    const student_id = localStorage.getItem("user_id");
    const [etudes, setEtudes] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/student/etude-request-list/${student_id}`
            )
            .then((res) => {
                setEtudes(res.data.etudes);
            });
    }, []);
    console.log(etudes);
    return (
        <div className="col border rounded-4 p-3 m-5">
            <h1>Etüt Taleplerim</h1>
            <table className="table table-hover">
                <thead>
                    <tr className="text-center">
                        <th>Etüt ID</th>
                        <th>Ders</th>
                        <th>Öğretmen</th>
                        <th>Etüt Türü</th>
                        <th>Tarih</th>
                        <th>Saat</th>
                        <th>Kapasite</th>
                        <th>Talep Durumu</th>
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
                                    <td>{etude.etude_date_start && new Date(etude.etude_date_start).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                                    <td>{etude.etude_date_start && new Date(etude.etude_date_start).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) }-{etude.etude_date_end &&new Date(etude.etude_date_end).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td>{etude.etude_capacity && etude.etude_capacity}</td>
                                    <td className={etude.request_status == "Onaylandı" ? "text-success" : "text-danger"}>{etude.request_status}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default EtudeRequestList;
