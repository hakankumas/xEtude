import axios from "axios";
import { useEffect, useState } from "react";
function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/student/all-student`).then((res) => {
            setStudents(res.data.students);
        });
    }, []);
    return (
        // prettier-ignore
        <div>
            <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#studentList">
                Öğrenci Listesi
            </button>
            <div className="modal fade" id="studentList">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="studentListLabel">
                                Öğrenci Listesi
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th className="col text-center">ID</th>
                                        <th className="col text-center">Öğrenci</th>
                                        <th className="col text-center">Şube</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {students.length > 0 && students.map((student, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{student.id}</td>
                                        <td>{student.name + " " + student.surname}</td>
                                        <td>{student.class_number + " . Sınıf"}</td>
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

export default StudentList;
