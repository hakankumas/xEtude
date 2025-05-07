import { useState } from "react";
import { useCustomSnackBar } from "../../hooks/useCustomSnackBar";
import useModalCloseListener from "../../hooks/useStateEmpty";
import { create_notice } from "../../redux/features/teacher/teacherSlice";
import { useDispatch } from "react-redux";

function CreateNotice({ selectedEtude }) {
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const dispatch = useDispatch();
    const [noticeInput, setNoticeInput] = useState("");

    useModalCloseListener("notificationModal", () => {
        setNoticeInput("");
    });

    const handleNotice = () => {
        if (!noticeInput) {
            snackBar_error();
            return;
        }
        try {
            const condition = {
                etude_id: selectedEtude.etude_id,
                notice: noticeInput,
            };
            dispatch(create_notice(condition));
            snackBar_success();
        } catch (error) {
            snackBar_error();
        }
    };

    return (
        // prettier-ignore
        <div className="modal fade" id="notificationModal">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Etüt Bildirimi</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
                    </div>
                    <div className="modal-body">
                        {selectedEtude ? (
                            <div className="col-12 d-flex flex-row px-5 py-3">
                                <div className="col-5">
                                    <p><strong>Etüt ID:</strong> {selectedEtude.etude_id}</p>
                                    <p><strong>Sınıf:</strong> {selectedEtude.etude_class_number}. Sınıf</p>
                                    <p><strong>Tarih:</strong> {new Date(selectedEtude.etude_date_start).toLocaleDateString('tr-TR')}</p>
                                    <p><strong>Başlangıç Saati:</strong> {new Date(selectedEtude.etude_date_start).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</p>
                                    <p><strong>Bitiş Saati:</strong> {new Date(selectedEtude.etude_date_end).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</p>
                                    <p><strong>Kapasite:</strong> {selectedEtude.etude_capacity} Kişi</p>
                                </div>
                                <div className="col-7">
                                    <div className="mb-3">
                                        <label className="form-label">Bildirim Metni</label>
                                        <textarea 
                                            className="form-control" 
                                            rows="8"
                                            value={noticeInput}
                                            onChange={(e) => setNoticeInput(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button 
                                            className="btn btn-success"
                                            onClick={handleNotice}
                                            data-bs-dismiss="modal"
                                        >
                                            Gönder
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Etüt bilgisi bulunamadı.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateNotice;
