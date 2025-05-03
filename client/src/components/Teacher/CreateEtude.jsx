import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useCustomSnackBar } from "../../hooks/useCustomSnackBar";
import { create_etude } from "../../redux/features/teacher/teacherSlice";

const fetchStudents = async () => {
    const res = await axios.get("http://localhost:3000/student/all-student");
    return res.data;
};
function CreateEtude() {
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const dispatch = useDispatch();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchStudents,
    });

    const [formData, setFormData] = useState({
        teacher_id: localStorage.getItem("user_id"),
        date_full: "",
        date_start: "",
        date_end: "",
        class_number: "",
        private_status: 0,
        capacity: "",
        private_student: "",
    });

    useEffect(() => {
        const modal = document.getElementById("createEtude");
        const handleClose = () => {
            setFormData({
                teacher_id: localStorage.getItem("user_id"),
                date_full: "",
                date_start: "",
                date_end: "",
                class_number: "",
                private_status: 0,
                capacity: "",
                private_student: "",
            });
        };
        modal?.addEventListener("hidden.bs.modal", handleClose);
        return () => {
            modal?.removeEventListener("hidden.bs.modal", handleClose);
        };
    }, []);

    // prettier-ignore
    const handleSubmit = (e) => {
        e.preventDefault();

        let condition = {
            teacher_id: formData.teacher_id,
            date_start: formData.date_full && formData.date_start ? `${formData.date_full} ${formData.date_start}:00` : null,
            date_end: formData.date_full && formData.date_end ? `${formData.date_full} ${formData.date_end}:00` : null,
            private_status: formData.private_status,
        }
        if(formData.private_status == 0){
            condition.class_number = formData.class_number;
            condition.capacity = formData.capacity;
        }
        if(formData.private_status == 1){
            condition.capacity = 1;
            condition.private_student = formData.private_student;
        }
        try {
            dispatch(create_etude(condition));
            snackBar_success();
        } catch (error) {
            snackBar_error();
        }
    };
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            class_number: "",
            capacity: "",
            private_student: "",
            date_full: "",
            date_start: "",
            date_end: "",
        }));
    }, [formData.private_status]);

    return (
        // prettier-ignore
        <div>
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createEtude">
                Yeni Bir Etüt Planla
            </button>
            <div className="modal fade" id="createEtude" tabIndex="-1" aria-labelledby="createEtudeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="createEtudeModalLabel">
                                Yeni Bir Etüt Planla
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" method="post">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Etüt Türü
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
                                    >
                                        <option value="0">Toplu Etüt</option>
                                        <option value="1">Özel Etüt</option>
                                    </select>
                                </div>
                                {formData.private_status === "1" ? (
                                <div className="mb-3">
                                    <label className="form-label">Öğrenci Bilgisi</label>
                                    <select className="form-select" 
                                        value={formData.private_student}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                private_student: e.target.value,
                                            });
                                        }}
                                    >
                                        <option value=""></option>
                                        {isLoading ? (
                                            <option>Yükleniyor...</option>
                                        ) : (
                                            data?.students.map((student) => (
                                                <option key={student.id} value={student.id}>{student.name} {student.surname}</option>
                                            ))
                                        )}
                                    </select>
                                </div>
                                ):(
                                <div>
                                    <div className="mb-3">
                                        <label className="form-label">Sınıf</label>
                                        <input type="text" className="form-control" placeholder="Örn:1" 
                                            value={formData.class_number}
                                            onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    class_number: e.target.value 
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Kapasite</label>
                                        <input type="text" className="form-control" 
                                            value={formData.capacity}
                                            onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    capacity: e.target.value 
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                )}
                                <div className="mb-3">
                                    <label className="form-label">Tarih</label>
                                    <input type="date" className="form-control" 
                                        value={formData.date_full}
                                        onChange={(e) => setFormData({ 
                                                ...formData, 
                                                date_full: e.target.value 
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Başlangıç Saati</label>
                                    <input type="time" className="form-control" 
                                        value={formData.date_start}
                                        onChange={(e) => setFormData({ 
                                                ...formData, 
                                                date_start: e.target.value 
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Bitiş Saati</label>
                                    <input type="time" className="form-control" 
                                        value={formData.date_end}
                                        onChange={(e) => setFormData({ 
                                                ...formData, 
                                                date_end: e.target.value 
                                            })
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                Tamam
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateEtude;
