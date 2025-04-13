import React from "react";
import { Route, Routes } from "react-router-dom";

import Teacher from "../pages/Teacher";
import Error from "../pages/Error";
import Sidebar from "../components/partials/Sidebar";

function TeacherRoutes() {
    return (
        <div className="row">
            <div className="d-flex">
                <div
                    style={{ width: "15%", minHeight: "100vh", height: "100%" }}
                >
                    <Sidebar />
                </div>
                <div
                    style={{ width: "85%", minHeight: "100vh", height: "100%" }}
                >
                    <Routes>
                        <Route path="/" element={<Teacher />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default TeacherRoutes;
