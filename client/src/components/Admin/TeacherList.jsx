import axios from "axios";
import { useEffect, useState } from "react";
function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/teacher/getall`).then((res) => {
            setTeachers(res.data.teachers);
        });
    }, []);
    return (
        // prettier-ignore
        <div>
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#teacherList">
                Öğretmen Listesi
            </button>
            <div className="modal fade" id="teacherList">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="teacherListLabel">
                                Öğretmen Listesi
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th className="col text-center">ID</th>
                                        <th className="col text-center">Branş</th>
                                        <th className="col text-center">Öğretmen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {teachers.length > 0 && teachers.map((teacher, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{teacher.teacher_id}</td>
                                        <td>{teacher.lesson_name}</td>
                                        <td>{teacher.teacher_name + " " + teacher.teacher_surname}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary">
                                Kapat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherList;
