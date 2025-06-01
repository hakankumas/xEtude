import { useCustomSnackBar } from "../../hooks/useCustomSnackBar";
import axios from "axios";
import { useEffect, useState } from "react";
function SendNoticeToParent() {
    console.log("SendNoticeToParent rendered.");
    const [parents, setParents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/parent/getall`).then((res) => {
            setParents(res.data.parents);
        });
    }, []);

    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const [formData, setFormData] = useState({
        teacher_id: localStorage.getItem("user_id"),
        parent_id: "",
        content: "",
    });
    const handleSubmit = async () => {
        if (!formData.parent_id || !formData.content) {
            snackBar_error();
            return;
        }
        try {
            const condition = {
                teacher_id: formData.teacher_id,
                parent_id: formData.parent_id,
                content: formData.content,
            };
            await axios.post(
                `http://localhost:3000/teacher/create-notice-for-parent`,
                condition
            );
            snackBar_success();
        } catch (error) {
            snackBar_error();
        }
    };

    return (
        // prettier-ignore
        <div>
            <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#sendNoticeToParent">
                Veliye Bildirim Gönder
            </button>
            <div className="modal fade" id="sendNoticeToParent">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="sendNoticeToParentModalLabel">
                                Veliye Bildirim Gönder
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Veli Bilgisi</label>
                                <select className="form-select" 
                                    value={formData.parent_id}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            parent_id: e.target.value,
                                        });
                                    }}
                                >
                                    <option value=""></option>
                                    {
                                        parents && parents.map((parent) => (
                                            <option key={parent.id} value={parent.id}>{parent.name + " " + parent.surname}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Bildirim</label>
                                <textarea 
                                    className="form-control" 
                                    rows="3" 
                                    value={formData.content} 
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            content: e.target.value,
                                        });
                                    }}
                                ></textarea>
                            </div>
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

export default SendNoticeToParent;
