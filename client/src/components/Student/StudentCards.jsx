import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function StudentCards() {
    console.log("StudentCards rendered.");
    const student_id = localStorage.getItem("user_id");
    const { mine_etudes } = useSelector((state) => state.student);
    const [etude, setEtude] = useState();

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/parent/student-etudes-counts/${student_id}`
            )
            .then((res) => {
                setEtude(res.data.etudes[0]);
            });
    }, [mine_etudes]);
    return (
        <div className="d-flex flex-row gap-3">
            <div className="col">
                <div className="card card-inset rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            {etude?.request_etudes_all ?? "Yükleniyor..."}
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Talep Edilen Etüt
                        </h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card card-inset rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            {etude?.request_etudes_private ?? "Yükleniyor..."}
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Talep Edilen Özel Etüt
                        </h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card card-inset rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            {etude?.request_etudes_public ?? "Yükleniyor..."}
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Talep Edilen Toplu Etüt
                        </h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card card-inset rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            {etude?.accepted_etudes ?? "Yükleniyor..."}
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Kabul Edilen Etüt
                        </h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card card-inset rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            {etude?.waiting_etudes ?? "Yükleniyor..."}
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Beklenen Etüt
                        </h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card card-inset rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            {etude?.enroll_etudes ?? "Yükleniyor..."}
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Kaydolunan Etüt
                        </h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card card-inset rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            {etude?.attended_etudes ?? "Yükleniyor..."}
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Katılınan Etüt
                        </h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card card-inset rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            {etude?.not_attended_etudes ?? "Yükleniyor..."}
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Katılınmayan Etüt
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentCards;
