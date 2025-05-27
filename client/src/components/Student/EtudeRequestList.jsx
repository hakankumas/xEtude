import axios from "axios";
import { useEffect, useState } from "react";
import GraphicRequestLesson from "./GraphicRequestLesson";
import GraphicRequestTeacher from "./GraphicRequestTeacher";
import GraphicRequestPrivateStatus from "./GraphicRequestPrivateStatus";
import StudentCardsRequest from "./StudentCardsRequest";

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
        <div className="mx-5">
            <div className="pt-3">
                <h1 className="h1 fw-bold">Etüt Taleplerim</h1>
            </div>
            <div className="col py-3">
                <StudentCardsRequest />
            </div>
            <div className="col-12 d-flex flex-row py-3">
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicRequestLesson student_id={student_id} />
                </div>
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicRequestTeacher student_id={student_id} />
                </div>
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicRequestPrivateStatus student_id={student_id} />
                </div>
            </div>
            <div className="col shadow rounded-4 p-3 my-3">
                <div className="h3 fw-bold">Talep Geçmişi</div>
                <table className="table table-hover">
                    <thead>
                        <tr>
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
                                    <tr key={index}>
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
        </div>
    );
}

export default EtudeRequestList;
