import ActiveEtude from "../components/Student/ActiveEtude";
import RequestEtude from "../components/Student/RequestEtude";
import Notices from "../components/Student/Notices";
import StudentCards from "../components/Student/StudentCards";
import EtudeHistory from "../components/Student/EtudeHistory";

function Student() {
    return (
        <div>
            <div className="col-12 mx-5 d-flex flex-row gap-3 align-items-center">
                <h1>Student</h1>
                <ActiveEtude />
                <RequestEtude />
                <Notices />
            </div>
            <hr />
            <div className="mx-5">
                <StudentCards />
                <EtudeHistory />
            </div>
        </div>
    );
}

export default Student;
