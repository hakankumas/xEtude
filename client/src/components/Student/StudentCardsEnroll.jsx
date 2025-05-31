import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUserCheck, FaUserPlus, FaUserTimes } from "react-icons/fa";

function StudentCardsEnroll() {
    console.log("StudentCardsEnroll rendered.");
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
        <div className="d-flex flex-row gap-5">
            <div className="col">
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            <span className="me-2">
                                <FaUserPlus
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#0e6dfc",
                                    }}
                                />
                            </span>
                            <span>
                                {etude?.enroll_etudes ?? "Yükleniyor..."}
                            </span>
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
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            <span className="me-2">
                                <FaUserCheck
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#27a844",
                                    }}
                                />
                            </span>
                            <span>
                                {etude?.attended_etudes ?? "Yükleniyor..."}
                            </span>
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
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            <span className="me-2">
                                <FaUserTimes
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#dc3546",
                                    }}
                                />
                            </span>
                            <span>
                                {etude?.not_attended_etudes ?? "Yükleniyor..."}
                            </span>
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

export default StudentCardsEnroll;
