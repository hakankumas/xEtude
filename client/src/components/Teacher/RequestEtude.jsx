import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    request_etudes,
    update_request_etude,
} from "../../redux/features/teacher/teacherSlice";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useCustomSnackBar } from "../../hooks/useCustomSnackBar";

function RequestEtude() {
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const { req_etudes } = useSelector((state) => state.teacher);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(request_etudes(localStorage.getItem("user_id")));
    }, []);

    const [editableRows, setEditableRows] = useState({});

    const [formData, setFormData] = useState({
        etude_id: "",
        capacity: "",
        new_date_full: "",
        new_date_start: "",
        new_date_end: "",
    });

    const toggleEditable = (index) => {
        const etude = req_etudes[index];
        setEditableRows((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));

        if (!editableRows[index]) {
            setFormData({
                etude_id: etude.etude_id,
                capacity: etude.capacity,
                new_date_full: etude.etude_date_start,
                new_date_start: etude.etude_date_start,
                new_date_end: etude.etude_date_end,
            });
        }
    };

    const handleUpdate = () => {
        if (
            !formData.etude_id ||
            !formData.capacity ||
            !formData.new_date_full ||
            !formData.new_date_start ||
            !formData.new_date_end
        ) {
            snackBar_error();
            return;
        }
        const condition = {
            etude_id: formData.etude_id,
            capacity: formData.capacity,
            date_start:
                formData.new_date_full && formData.new_date_start
                    ? `${formData.new_date_full} ${formData.new_date_start}:00`
                    : null,
            date_end:
                formData.new_date_full && formData.new_date_end
                    ? `${formData.new_date_full} ${formData.new_date_end}:00`
                    : null,
        };
        try {
            dispatch(update_request_etude(condition));
            snackBar_success();
        } catch (error) {
            snackBar_error();
        }
    };

    return (
        // prettier-ignore
        <div>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#requestEtude">
                Etüt Talepleri
            </button>
            {/* <div className="modal fade" id="requestEtude" tabIndex="-1" aria-labelledby="requestEtudeModalLabel" aria-hidden="true"> */}
            <div className="modal fade" id="requestEtude">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="requestEtudeModalLabel">
                                Etüt Talepleri
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* prettier-ignore */}
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th className="col text-center">Sınıf</th>
                                            <th className="col text-center">Etüt Türü</th>
                                            <th className="col text-center">Kapasite</th>
                                            <th className="col text-center">Tarih</th>
                                            <th className="col text-center">Başlangıç</th>
                                            <th className="col text-center">Bitiş</th>
                                            <th className="col text-center">Talep Eden</th>
                                            <th className="col text-center">Detay</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {req_etudes.map((etude, index) => {
                                        const isEditable = editableRows[index];

                                        return (
                                            <tr key={index} className="text-center">
                                                <td style={{ width: "100px" }}>{etude.etude_class_number}. Sınıf</td>
                                                <td style={{ width: "150px"}}>{etude.etude_private_status === 0 ? "Toplu Etüt" : "Özel Etüt"}</td>
                                                <td style={{width: "100px"}}>
                                                    {isEditable ? (
                                                        <div className="d-flex justify-content-center">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                style={{width: '100px'}} 
                                                                placeholder="Örn:1"
                                                                value={formData.capacity || ""}
                                                                onChange={(e) => setFormData({
                                                                    ...formData, 
                                                                    capacity: e.target.value
                                                                })} />
                                                        </div>
                                                    ) : (
                                                        etude.etude_capacity ? etude.etude_capacity : null
                                                    )}
                                                </td>
                                                <td style={{width: "150px"}}>
                                                    {isEditable ? (
                                                        <div className="d-flex justify-content-center">
                                                            <input 
                                                                type="date" 
                                                                className="form-control" 
                                                                style={{width: '150px'}} 
                                                                value={formData.new_date_full || ""}
                                                                onChange={(e) => setFormData({
                                                                    ...formData, 
                                                                    new_date_full: e.target.value
                                                                })} />
                                                        </div>
                                                    ) : (
                                                        etude.etude_date_start ? new Date(etude.etude_date_start).toLocaleDateString('tr-TR') : null
                                                    )}
                                                </td>
                                                <td style={{width: "150px"}}>
                                                    {isEditable ? (
                                                        <div className="d-flex justify-content-center">
                                                            <input 
                                                                type="time" 
                                                                className="form-control" 
                                                                style={{width: '100px'}}
                                                                value={formData.new_date_start || ""}
                                                                onChange={(e) => setFormData({
                                                                    ...formData, 
                                                                    new_date_start: e.target.value
                                                                })} />
                                                        </div>
                                                    ) : (                                                       
                                                        etude.etude_date_start ? new Date(etude.etude_date_start).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : null
                                                    )}
                                                </td>
                                                <td style={{width: "150px"}}>
                                                    {isEditable ? (
                                                        <div className="d-flex justify-content-center">
                                                            <input 
                                                                type="time" 
                                                                className="form-control" 
                                                                style={{width: '100px'}}
                                                                value={formData.new_date_end || ""}
                                                                onChange={(e) => setFormData({
                                                                    ...formData, 
                                                                    new_date_end: e.target.value
                                                                })} />
                                                        </div>
                                                    ) : (
                                                        etude.etude_date_end ? new Date(etude.etude_date_end).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : null
                                                    )}
                                                </td>
                                                <td style={{width: '250px'}}>{etude.student_name} {etude.student_surname}</td>
                                                <td style={{width: '100px'}}>
                                                <button
                                                    className={isEditable ? "btn btn-success" : "btn btn-primary"}
                                                    onClick={() => {
                                                        if (isEditable) {
                                                            handleUpdate(); // güncelleme işlemi
                                                        }
                                                        toggleEditable(index);
                                                    }}
                                                >
                                                    {isEditable ? <FaCheck /> : <FaEdit />}
                                                </button>

                                                </td>
                                            </tr>
                                        );
                                    })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestEtude;
