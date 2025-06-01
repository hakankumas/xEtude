import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck, FaHourglassHalf, FaPlus, FaSearch } from "react-icons/fa";
import { IoIosPeople, IoIosPerson } from "react-icons/io";
import { RiParentFill } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";
function AdminCards() {
    console.log("AdminCards rendered.");
    const [datas, setDatas] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3000/admin/user-types`).then((res) => {
            setDatas(res.data.datas[0]);
        });
    }, []);
    return (
        <div className="d-flex flex-row gap-5">
            <div className="col">
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            <span className="me-2">
                                <GiTeacher
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#0e6dfc",
                                    }}
                                />
                            </span>
                            <span>
                                {datas?.type_teacher ?? "Yükleniyor..."}
                            </span>
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Öğretmen
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
                                        color: "#fec107",
                                    }}
                                />
                            </span>
                            <span>
                                {datas?.type_student ?? "Yükleniyor..."}
                            </span>
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Öğrenci
                        </h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            <span className="me-2">
                                <RiParentFill
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#6c747e",
                                    }}
                                />
                            </span>
                            <span>{datas?.type_parent ?? "Yükleniyor..."}</span>
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Veli
                        </h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body">
                        <p className="card-text fw-bold h1">
                            <span className="me-2">
                                <FaSearch
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#97009b",
                                    }}
                                />
                            </span>
                            <span>{datas?.total_etude ?? "Yükleniyor..."}</span>
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
                                <FaCheck
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        color: "#27a844",
                                    }}
                                />
                            </span>
                            <span>
                                {datas?.total_etude_enroll ?? "Yükleniyor..."}
                            </span>
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Toplam Etüt Kaydı
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
                                        color: "#d94676",
                                    }}
                                />
                            </span>
                            <span>
                                {datas?.total_etude_request ?? "Yükleniyor..."}
                            </span>
                        </p>
                        <h5
                            className="card-title d-flex align-items-center"
                            style={{ minHeight: "50px" }}
                        >
                            Toplam Etüt Talebi
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminCards;
