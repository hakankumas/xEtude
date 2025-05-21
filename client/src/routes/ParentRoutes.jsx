import { Route, Routes } from "react-router-dom";
import Parent from "../pages/Parent";
import Error from "../pages/Error";
import SidebarParent from "../components/partials/SidebarParent";
import Settings from "../components/Settings";
import ChildItem from "../components/Parent/ChildItem";

function ParentRoutes() {
    return (
        <div className="row">
            <div className="d-flex">
                <div
                    style={{ width: "15%", minHeight: "100vh", height: "100%" }}
                >
                    <SidebarParent />
                </div>
                <div
                    style={{ width: "85%", minHeight: "100vh", height: "100%" }}
                >
                    <Routes>
                        <Route path="/" element={<Parent />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route
                            path="/child/:student_id"
                            element={<ChildItem />}
                        />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default ParentRoutes;
