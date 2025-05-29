import { Route, Routes } from "react-router-dom";
import Teacher from "../pages/Teacher";
import Error from "../pages/Error";
import AttendList from "../components/Teacher/AttendList";
import AttendListItem from "../components/Teacher/AttendListItem";

function TeacherRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Teacher />} />
            <Route path="/attend-list" element={<AttendList />} />
            <Route path="/attend-list/:etude_id" element={<AttendListItem />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default TeacherRoutes;
