import { Route, Routes } from "react-router-dom";
import Student from "../pages/Student";
import Error from "../pages/Error";
import Settings from "../components/Settings";
import SidebarStudent from "../components/partials/SidebarStudent";
import EtudeHistory from "../components/Student/EtudeHistory";

function StudentRoutes() {
    return (
        <div className="row">
            {/* prettier-ignore */}
            <div className="d-flex">
                <div style={{ width: "15%", minHeight: "100vh", height: "100%" }}>
                    <SidebarStudent />
                </div>
                <div style={{ width: "85%", minHeight: "100vh", height: "100%" }}>
                    <Routes>
                        <Route path="/" element={<Student />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/etude-history" element={<EtudeHistory />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default StudentRoutes;
