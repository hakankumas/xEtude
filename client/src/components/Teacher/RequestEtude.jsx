import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request_etudes } from "../../redux/features/teacher/teacherSlice";

function RequestEtude() {
    const { req_etudes } = useSelector((state) => state.teacher);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(request_etudes(localStorage.getItem("user_id")));
    }, []);
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
                                            <th className="col text-center">Tarih</th>
                                            <th className="col text-center">Başlangıç</th>
                                            <th className="col text-center">Bitiş</th>
                                            <th className="col text-center">Talep Eden</th>
                                            <th className="col text-center">Detay</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {req_etudes && req_etudes.length > 0 && req_etudes.map((etude, index) => (
                                        <tr key={index} className="text-center">
                                            <td>{etude.etude_class_number + ". Sınıf"}</td>
                                            <td>{etude.etude_private_status === 1 ? "Özel Etüt" : "Toplu Etüt"}</td>
                                            <td>{etude.etude_date_start && new Date(etude.etude_date_start).toLocaleDateString('tr-TR')}</td>
                                            <td>{etude.etude_date_start && new Date(etude.etude_date_start).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{etude.etude_date_end && new Date(etude.etude_date_end).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{etude.student_name} {etude.student_surname}</td>
                                            <td><a href="#/${etude.etude_request}" className="btn btn-primary">Detay</a></td>
                                        </tr>
                                    ))}
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
