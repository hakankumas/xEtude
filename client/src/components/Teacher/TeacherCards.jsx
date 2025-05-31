import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck, FaHourglassHalf, FaPlus } from "react-icons/fa";
import { IoIosPeople, IoIosPerson } from "react-icons/io";
function TeacherCards({ teacher_id }) {
    console.log("TeacherCards rendered.");
    const [etude, setEtude] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/teacher/etudes-counts/${teacher_id}`)
            .then((res) => {
                setEtude(res.data.etudes[0]);
            });
    }, [teacher_id]);
    return (
        <div className="d-flex flex-row gap-5">
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
                            <span>{etude?.etude_count ?? "Yükleniyor..."}</span>
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Toplam Etüt
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
                            <span>{etude?.ps_private ?? "Yükleniyor..."}</span>
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
                            <span>{etude?.ps_public ?? "Yükleniyor..."}</span>
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
                            <span>{etude?.req_accept ?? "Yükleniyor..."}</span>
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
                            <span>{etude?.req_wait ?? "Yükleniyor..."}</span>
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Bekleyen Etüt
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherCards;
