import { Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin";
import Error from "../pages/Error";

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default AdminRoutes;
