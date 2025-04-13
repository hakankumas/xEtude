import React from "react";
import { Route, Routes } from "react-router-dom";

import Admin from "../pages/Admin";
import Error from "../pages/Error";
import Sidebar from "../components/partials/Sidebar";

function AdminRoutes() {
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
                        <Route path="/" element={<Admin />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default AdminRoutes;
