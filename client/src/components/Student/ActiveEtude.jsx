import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    active_etudes,
    enroll_etude,
    my_etudes,
    release_etude,
} from "../../redux/features/student/studentSlice";
import { useCustomSnackBar } from "../../hooks/useCustomSnackBar";

function ActiveEtude() {
    const { etudes, mine_etudes } = useSelector((state) => state.student);
    const dispatch = useDispatch();
    const { snackBar_success, snackBar_error } = useCustomSnackBar();

    useEffect(() => {
        dispatch(active_etudes(localStorage.getItem("class_number")));
        dispatch(my_etudes(localStorage.getItem("user_id")));
    }, []);

    const handleEnroll = (etude_id) => {
        const condition = {
            etude_id,
            student_id: localStorage.getItem("user_id"),
        };

        try {
            dispatch(enroll_etude(condition)).then(() => {
                dispatch(active_etudes(localStorage.getItem("class_number")));
                dispatch(my_etudes(localStorage.getItem("user_id")));
            });
            snackBar_success();
        } catch (error) {
            snackBar_error();
        }
    };

    const handleRelease = (etude_id) => {
        const condition = {
            etude_id,
            student_id: localStorage.getItem("user_id"),
        };
        try {
            dispatch(release_etude(condition)).then(() => {
                dispatch(active_etudes(localStorage.getItem("class_number")));
                dispatch(my_etudes(localStorage.getItem("user_id")));
            });
            snackBar_success();
        } catch (error) {
            snackBar_error();
        }
    };

    // prettier-ignore
    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#activeEtude">Aktif Etütler</button>
            {/* <div className="modal fade" id="activeEtude" tabIndex="-1" aria-labelledby="activeEtudeModalLabel" aria-hidden="true"> */}
            <div className="modal fade" id="activeEtude">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="activeEtudeModalLabel">Aktif Etütler</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr className="text-center">
                                            <th className="col">Etüt ID</th>
                                            <th className="col">Ders</th>
                                            <th className="col">Öğretmen</th>
                                            <th className="col">Tarih</th>
                                            <th className="col">Saat</th>
                                            <th className="col">Kapasite</th>
                                            <th className="col">Kayıt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {etudes.length > 0 && etudes.map((etude, index) => {
                                        const isMine = mine_etudes.some(mine => mine.etude_id === etude.etude_id);
                                        return (
                                        <tr key={index} className="text-center">
                                            <td>{etude.etude_id}</td>
                                            <td>{etude.lesson_name}</td>
                                            <td>{`${etude.teacher_name} ${etude.teacher_surname}`}</td>
                                            <td>{new Date(etude.etude_date_start).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                                            <td>{new Date(etude.etude_date_start).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) }-{new Date(etude.etude_date_end).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{`${etude.number_of_etude_join ? etude.number_of_etude_join : 0}/${etude.etude_capacity}`}</td>
                                            <td>
                                            {isMine ? (
                                                <a className="btn btn-warning" onClick={() => handleRelease(etude.etude_id)}>Çık</a>
                                            ) : (
                                                etude.number_of_etude_join < etude.etude_capacity ? (
                                                <a className="btn btn-primary" onClick={() => handleEnroll(etude.etude_id)}>Kaydol</a>
                                                ) : (
                                                <a href="#" className="btn btn-danger disabled">Dolu</a>
                                                )
                                            )}
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

export default ActiveEtude;
