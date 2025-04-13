import React from "react";
import { Route, Routes } from "react-router-dom";

import Student from "../pages/Student";
import Error from "../pages/Error";
import Sidebar from "../components/partials/Sidebar";

function StudentRoutes() {
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
                        <Route path="/" element={<Student />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default StudentRoutes;
