import { Route, Routes } from "react-router-dom";
import Parent from "../pages/Parent";
import Error from "../pages/Error";
import Child from "../components/Parent/Child";

function ParentRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Parent />} />
            <Route path="/child/:student_id" element={<Child />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default ParentRoutes;
