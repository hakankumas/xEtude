import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_notices } from "../../redux/features/student/studentSlice";

function Notices() {
    console.log("notices");
    const dispatch = useDispatch();
    const { mine_etudes, mine_notices } = useSelector((state) => state.student);

    useEffect(() => {
        dispatch(get_notices(localStorage.getItem("user_id")));
    }, [mine_etudes]);

    console.log(mine_notices);
    return (
        // prettier-ignore
        <div>
            <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#notices">Bildirimlerim</button>
            <div className="modal fade" id="notices">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="noticesModalLabel">Bildirimlerim</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr className="text-center">
                                            <th style={{width: "10%"}}>Etüt ID</th>
                                            <th style={{width: "20%"}}>Öğretmen</th>
                                            <th style={{width: "50%"}}>Bildirim Metni</th>
                                            <th style={{width: "20%"}}>Tarih</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {mine_notices && mine_notices.map((notice, index) => (
                                        <tr key={index} className="text-center">
                                            <td>{notice.etude_notice_etude_id}</td>
                                            <td>{`${notice.teacher_name} ${notice.teacher_surname}`}</td>
                                            <td className="text-start">{notice.etude_notice_content}</td>
                                            <td>
                                                {new Date(notice.etude_notice_createdAt).toLocaleDateString('tr-TR', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })} -{" "}
                                                {new Date(notice.etude_notice_createdAt).toLocaleTimeString('tr-TR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                                
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
        </div>
    );
}

export default Notices;
