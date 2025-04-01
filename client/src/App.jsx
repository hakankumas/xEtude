import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./scss/index.scss";

const SERVER_URL = import.meta.env.VITE_API_BASE_URL;

import Sidebar from "./components/partials/Sidebar";
import Footer from "./components/partials/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Parent from "./pages/Parent";
import Teacher from "./pages/Teacher";
import Admin from "./pages/Admin";
import Header from "./components/partials/Header";

function App() {
    const location = useLocation();
    if (location.pathname === "/login") return <Login />;
    if (location.pathname === "/logout") return <Logout />;
    if (location.pathname === "/") return <Home />;

    return (
        <div>
            <Header />
            <div className="d-flex flex-row">
                <div style={{ width: "300px" }}>
                    <Sidebar />
                </div>
                <div style={{ width: "100%" }}>
                    <div style={{ minHeight: "100vh" }}>
                        <Routes>
                            <Route path="/student" element={<Student />} />
                            <Route path="/parent" element={<Parent />} />
                            <Route path="/teacher" element={<Teacher />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </div>
                    <div
                        style={{
                            position: "relative",
                            bottom: 0,
                            width: "100%",
                        }}
                    >
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
