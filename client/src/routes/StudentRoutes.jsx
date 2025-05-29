import { Route, Routes } from "react-router-dom";
import Student from "../pages/Student";
import Error from "../pages/Error";
import EtudeRequestList from "../components/Student/EtudeRequestList";

function StudentRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Student />} />
            <Route path="/etude-request-list" element={<EtudeRequestList />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default StudentRoutes;
