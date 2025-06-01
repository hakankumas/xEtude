import axios from "axios";
import { useEffect, useState } from "react";
function ParentList() {
    const [parents, setParents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/parent/all-parents`).then((res) => {
            setParents(res.data.parents);
        });
    }, []);
    return (
        // prettier-ignore
        <div>
            <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#parentList">
                Veli Listesi
            </button>
            <div className="modal fade" id="parentList">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="parentListLabel">
                                Veli Listesi
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th className="col text-center">Veli</th>
                                        <th className="col text-center">Öğrenci</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {parents.length > 0 && parents.map((parent, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{parent.parent_name + " " + parent.parent_surname}</td>
                                        <td>{parent.student_name + " " + parent.student_surname}</td>
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

export default ParentList;
