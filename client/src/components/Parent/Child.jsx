import { useParams } from "react-router-dom";
import ParentCards from "./ParentCards";
import EtudesHistory from "./EtudesHistory";
import EnrolledEtudesByLesson from "./EnrolledEtudesByLesson";
import EnrolledEtudesByTeacher from "./EnrolledEtudesByTeacher";
import MessagesForStudent from "./MessagesForStudent";

function Child() {
    console.log("Child rendered.");
    const { student_id } = useParams();

    return (
        <div className="mt-3">
            <div className="px-3">
                <ParentCards student_id={student_id} />
            </div>
            <div className="px-3 py-3 d-flex flex-row gap-4">
                <div className="col-3 shadow rounded-4 p-3">
                    <EnrolledEtudesByLesson student_id={student_id} />
                </div>
                <div className="col-3 shadow rounded-4 p-3">
                    <EnrolledEtudesByTeacher student_id={student_id} />
                </div>
                <div className="col shadow rounded-4 p-3">
                    <MessagesForStudent student_id={student_id} />
                </div>
            </div>
            <div className="px-3 py-3">
                <EtudesHistory student_id={student_id} />
            </div>
        </div>
    );
}

export default Child;
