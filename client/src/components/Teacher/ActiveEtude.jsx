import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { active_etudes } from "../../redux/features/teacher/teacherSlice";

function ActiveEtude() {
    const { etudes } = useSelector((state) => state.teacher);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(active_etudes(localStorage.getItem("user_id")));
    }, []);

    return (
        // prettier-ignore
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#activeEtude">
                Aktif Etütlerim
            </button>
            <div className="modal fade" id="activeEtude" tabIndex="-1" aria-labelledby="activeEtudeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="activeEtudeModalLabel">
                                Aktif Etütlerim
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th className="col text-center">ID</th>
                                            <th className="col text-center">Sınıf</th>
                                            <th className="col text-center">Tarih</th>
                                            <th className="col text-center">Başlangıç</th>
                                            <th className="col text-center">Bitiş</th>
                                            <th className="col text-center">Kapasite</th>
                                            <th className="col text-center">Bildirim</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {etudes.length > 0 && etudes.map((etude, index) => (
                                        <tr key={index} className="text-center">
                                            <td>{etude.etude_id}</td>
                                            <td>{etude.etude_class_number + ". Sınıf"}</td>
                                            <td>{etude.etude_date_start && new Date(etude.etude_date_start).toLocaleDateString('tr-TR')}</td>
                                            <td>{etude.etude_date_start && new Date(etude.etude_date_start).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{etude.etude_date_end && new Date(etude.etude_date_end).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{etude.etude_capacity}</td>
                                            <td><a href="#/${etude.etude_request}" className="btn btn-primary">Bildirim</a></td>
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

export default ActiveEtude;
