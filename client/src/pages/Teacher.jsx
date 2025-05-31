import TeacherCards from "../components/Teacher/TeacherCards";
import GraphicEtudesByClassNumber from "../components/Teacher/GraphicEtudesByClassNumber";
import GraphicEtudesByStudent from "../components/Teacher/GraphicEtudesByStudent";
import GraphicEtudesByAttendStatus from "../components/Teacher/GraphicEtudesByAttendStatus";
function Teacher() {
    const teacher_id = localStorage.getItem("user_id");
    return (
        <div className="m-4">
            <div>
                <TeacherCards teacher_id={teacher_id} />
            </div>
            <div className="col-12 d-flex flex-row py-3 gap-5">
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicEtudesByAttendStatus teacher_id={teacher_id} />
                </div>
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicEtudesByClassNumber teacher_id={teacher_id} />
                </div>
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicEtudesByStudent teacher_id={teacher_id} />
                </div>
            </div>
        </div>
    );
}

export default Teacher;
