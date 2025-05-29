import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { active_etudes } from "../../redux/features/teacher/teacherSlice";
import CreateNotice from "./CreateNotice";

function ActiveEtude() {
    const { etudes, req_etudes } = useSelector((state) => state.teacher);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(active_etudes(localStorage.getItem("user_id")));
    }, [req_etudes]);

    const [selectedEtude, setSelectedEtude] = useState(null);
    const handleNotificationClick = (etude) => setSelectedEtude(etude);

    return (
        // prettier-ignore
        <div>

            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#activeEtude">
                Aktif Etütlerim
            </button>

            <div className="modal fade" id="activeEtude">
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
                                            <th className="col text-center">Saat</th>
                                            <th className="col text-center">Kapasite</th>
                                            <th className="col text-center">Bildirim</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {etudes.length > 0 && etudes.map((etude, index) => (
                                        <tr key={index} className="text-center">
                                            <td>{etude.etude_id}</td>
                                            <td>{etude.etude_class_number + ". Sınıf"}</td>
                                            <td>{etude.etude_date_start && new Date(etude.etude_date_start).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                                            <td>{etude.etude_date_start && new Date(etude.etude_date_start).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) }-{new Date(etude.etude_date_end).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{etude.etude_capacity}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#notificationModal"
                                                    onClick={() => handleNotificationClick(etude)}
                                                >
                                                    Bildirim
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateNotice selectedEtude={selectedEtude} />
        </div>
    );
}

export default ActiveEtude;
