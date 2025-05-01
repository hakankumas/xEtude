import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { create_request_etude } from "../../redux/features/student/studentSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCustomSnackBar } from "../../hooks/useCustomSnackBar";

const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/teacher/all-teacher");
    return res.data;
};
function RequestEtude() {
    const class_number = localStorage.getItem("class_number");
    const request_from = localStorage.getItem("user_id");

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const dispatch = useDispatch();
    const [randomDate, setRandomDate] = useState(false);
    const [formData, setFormData] = useState({
        teacher_id: "",
        private_status: 0,
        date_full: "",
        date_start: "",
        date_end: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (randomDate) {
            if (
                !formData.date_full ||
                !formData.date_start ||
                !formData.date_end
            ) {
                snackBar_error();
                return;
            }
            if (formData.date_start >= formData.date_end) {
                snackBar_error();
                return;
            }
        }
        // prettier-ignore
        const condition = {
            teacher_id: formData.teacher_id,
            date_start: randomDate && formData.date_full && formData.date_start ? `${formData.date_full} ${formData.date_start}:00`: null,
            date_end: randomDate && formData.date_full && formData.date_end ? `${formData.date_full} ${formData.date_end}:00`: null,
            class_number,
            private_status: formData.private_status,
            capacity: formData.private_status == 1 ? 1 : null,
            request: 1,
            request_from,
        };
        // console.log(condition);
        try {
            if (condition.teacher_id != "" && condition.request_from != "") {
                dispatch(create_request_etude(condition));
                snackBar_success();
            } else snackBar_error();
        } catch (error) {
            snackBar_error();
        }
    };

    useEffect(() => {
        const modal = document.getElementById("requestEtude");
        const handleClose = () => {
            setFormData({
                teacher_id: "",
                private_status: 0,
                date_full: "",
                date_start: "",
                date_end: "",
            });
            setRandomDate(false);
        };
        modal?.addEventListener("hidden.bs.modal", handleClose);
        return () => {
            modal?.removeEventListener("hidden.bs.modal", handleClose);
        };
    }, []);

    return (
        // prettier-ignore
        <div>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#requestEtude">
                Etüt Talebi Oluştur
            </button>
            <div className="modal fade" id="requestEtude" tabIndex="-1" aria-labelledby="requestEtudeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="requestEtudeModalLabel">
                                Etüt Talebi Oluştur
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Öğretmen
                                    </label>
                                    <select
                                        className="form-select"
                                        value={formData.teacher_id}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                teacher_id: e.target.value,
                                            });
                                        }}
                                        required
                                    >
                                        <option value=""></option>
                                        {isLoading ? (
                                            <option>Yükleniyor...</option>
                                        ) : (
                                            // prettier-ignore
                                            data?.teachers.map((teacher) => (
                                                <option key={teacher.id} value={teacher.id}>{teacher.name} {teacher.surname}</option>
                                            ))
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Özel Etüt
                                    </label>
                                    <select
                                        className="form-select"
                                        value={formData.private_status}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                private_status: e.target.value,
                                            });
                                        }}
                                        required
                                    >
                                        <option value=""></option>
                                        <option value="1">Evet</option>
                                        <option value="0">Hayır</option>
                                    </select>
                                </div>
                                {formData.private_status == "1" && (
                                    <div>
                                        <div className="mb-3 form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                disabled={
                                                    formData.private_status !==
                                                    "1"
                                                }
                                                checked={randomDate}
                                                onChange={(e) => {
                                                    setRandomDate(!randomDate);
                                                }}
                                            />
                                            <label className="form-check-label">
                                                Tarih Belirlemek İstiyorum.
                                            </label>
                                        </div>
                                        {randomDate && (
                                            <div>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Tarih
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        disabled={randomDate !== true}
                                                        value={formData.date_full}
                                                        onChange={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                date_full:
                                                                    e.target.value,
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Başlangıç Saati
                                                    </label>
                                                    <input
                                                        type="time"
                                                        className="form-control"
                                                        disabled={randomDate !== true}
                                                        value={formData.date_start}
                                                        onChange={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                date_start:
                                                                    e.target.value,
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Bitiş Saati
                                                    </label>
                                                    <input
                                                        type="time"
                                                        className="form-control"
                                                        disabled={randomDate !== true}
                                                        value={formData.date_end}
                                                        onChange={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                date_end:
                                                                    e.target.value,
                                                            });
                                                        }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Tamam
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestEtude;
