import { Route, Routes } from "react-router-dom";
import Teacher from "../pages/Teacher";
import Error from "../pages/Error";
import SidebarTeacher from "../components/partials/SidebarTeacher";
import Settings from "../components/Settings";
import AttendList from "../components/Teacher/AttendList";
import AttendListItem from "../components/Teacher/AttendListItem";

function TeacherRoutes() {
    return (
        <div className="row">
            {/* prettier-ignore */}
            <div className="d-flex">
                <div style={{ width: "15%", minHeight: "100vh", height: "100%" }}>
                    <SidebarTeacher />
                </div>
                <div style={{ width: "85%", minHeight: "100vh", height: "100%" }}>
                    <Routes>
                        <Route path="/" element={<Teacher />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/attend-list" element={<AttendList />} />
                        <Route path="/attend-list/:etude_id" element={<AttendListItem />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default TeacherRoutes;
