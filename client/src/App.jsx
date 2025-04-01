import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./scss/index.scss";

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Parent from "./pages/Parent";
import Teacher from "./pages/Teacher";
import Admin from "./pages/Admin";

function App() {
    const location = useLocation();
    if (location.pathname === "/login") return <Login />;
    if (location.pathname === "/") return <Home />;

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/student" element={<Student />} />
                <Route path="/parent" element={<Parent />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
