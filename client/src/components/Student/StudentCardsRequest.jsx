import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck, FaHourglassHalf, FaPlus } from "react-icons/fa";
import { IoIosPeople, IoIosPerson } from "react-icons/io";

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
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            <span className="me-2">
                                <FaPlus
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#0e6dfc",
                                    }}
                                />
                            </span>
                            <span>
                                {etude?.request_etudes_all ?? "Yükleniyor..."}
                            </span>
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
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            <span className="me-2">
                                <IoIosPerson
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#fec107",
                                    }}
                                />
                            </span>
                            <span>
                                {etude?.request_etudes_private ??
                                    "Yükleniyor..."}
                            </span>
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
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            <span className="me-2">
                                <IoIosPeople
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#6c747e",
                                    }}
                                />
                            </span>
                            <span>
                                {etude?.request_etudes_public ??
                                    "Yükleniyor..."}
                            </span>
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
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            <span className="me-2">
                                <FaCheck
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#27a844",
                                    }}
                                />
                            </span>
                            <span>
                                {etude?.accepted_etudes ?? "Yükleniyor..."}
                            </span>
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
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            <span className="me-2">
                                <FaHourglassHalf
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#353a40",
                                    }}
                                />
                            </span>
                            <span>
                                {etude?.waiting_etudes ?? "Yükleniyor..."}
                            </span>
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
        </div>
    );
}

export default StudentCards;
