import ActiveEtude from "../components/Student/ActiveEtude";
import RequestEtude from "../components/Student/RequestEtude";
import Notices from "../components/Student/Notices";
import StudentCardsEnroll from "../components/Student/StudentCardsEnroll";
import GraphicEnrollLesson from "../components/Student/GraphicEnrollLesson";
import GraphicEnrollTeacher from "../components/Student/GraphicEnrollTeacher";
import GraphicEnrollPrivateStatus from "../components/Student/GraphicEnrollPrivateStatus";
import GraphicEnrollAttendStatus from "../components/Student/GraphicEnrollAttendStatus";
import EtudeHistory from "../components/Student/EtudeHistory";

function Student() {
    return (
        <div className="mx-5">
            <div className="col-12 d-flex flex-row gap-3 align-items-center">
                <h1>Student</h1>
                <ActiveEtude />
                <RequestEtude />
                <Notices />
            </div>
            <hr />
            <div>
                <StudentCardsEnroll />
            </div>
            <div className="col-12 d-flex flex-row py-3 gap-5">
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicEnrollLesson />
                </div>
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicEnrollTeacher />
                </div>
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicEnrollPrivateStatus />
                </div>
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicEnrollAttendStatus />
                </div>
            </div>
            <div>
                <EtudeHistory />
            </div>
        </div>
    );
}

export default Student;
