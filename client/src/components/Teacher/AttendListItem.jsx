import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

function AttendListItem() {
    console.log("AttendListItem worked.");
    const { etude_id } = useParams();
    const [etudes, setEtudes] = useState([]);
    const [newData, setNewData] = useState("");

    useEffect(() => {
        setNewData("");
        axios
            .get(
                `http://localhost:3000/teacher/attend-etudes-etude/${etude_id}`
            )
            .then((res) => {
                setEtudes(res.data.attends_etude);
            });
    }, [newData]);

    const handleCheck = async (etude) => {
        try {
            const condition = {
                etude_id: etude.etude_id,
                student_id: etude.student_id,
                attend_status: 1,
            };
            const response = await axios.post(
                `http://localhost:3000/teacher/update-attend-etude`,
                condition
            );
            setNewData(response.data.message);
        } catch (error) {
            console.error(error.message);
        }
    };
    const handleTimes = async (etude) => {
        try {
            const condition = {
                etude_id: etude.etude_id,
                student_id: etude.student_id,
                attend_status: 0,
            };
            const response = await axios.post(
                `http://localhost:3000/teacher/update-attend-etude`,
                condition
            );
            setNewData(response.data.message);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="col-6">
            <table className="table table-hover">
                <thead className="text-center">
                    <tr>
                        <th>Öğrenci ID</th>
                        <th>Adı</th>
                        <th>Soyadı</th>
                        <th>Yoklama</th>
                    </tr>
                </thead>
                <tbody>
                    {etudes.length > 0 &&
                        etudes.map((etude, index) => {
                            return (
                                <tr key={index} className="text-center">
                                    <td>{etude.student_id}</td>
                                    <td>{etude.student_name}</td>
                                    <td>{etude.student_surname}</td>
                                    <td>
                                        {etude.attend == 0 ? (
                                            <span
                                                onClick={() =>
                                                    handleCheck(etude)
                                                }
                                                style={{
                                                    cursor: "pointer",
                                                    color: "green",
                                                }}
                                            >
                                                <FaCheck /> Katıldı Olarak
                                                Güncelle
                                            </span>
                                        ) : (
                                            <span
                                                onClick={() =>
                                                    handleTimes(etude)
                                                }
                                                style={{
                                                    cursor: "pointer",
                                                    color: "red",
                                                }}
                                            >
                                                <FaTimes /> Katılmadı Olarak
                                                Güncelle
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default AttendListItem;
