import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./scss/index.scss";
import Header from "./components/partials/Header";
import Sidebar from "./components/partials/Sidebar";
import Footer from "./components/partials/Footer";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Parent from "./pages/Parent";
import Teacher from "./pages/Teacher";
import Admin from "./pages/Admin";
import Error from "./pages/Error";
import { is_session } from "./redux/features/auth/authSlice";

const App = () => {
    const { type, session } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(is_session());
    }, [dispatch]);

    if (location.pathname === "/login") return <Login />;
    if (location.pathname === "/logout") return <Logout />;
    if (location.pathname === "/") return <Home />;

    if (session) {
        switch (type) {
            case "student":
                if (
                    location.pathname !== "/student" &&
                    !location.pathname.startsWith("/student/")
                ) {
                    navigate("/student");
                }
                break;
            case "parent":
                if (
                    location.pathname !== "/parent" &&
                    !location.pathname.startsWith("/parent/")
                ) {
                    navigate("/parent");
                }
                break;
            case "teacher":
                if (
                    location.pathname !== "/teacher" &&
                    !location.pathname.startsWith("/teacher/")
                ) {
                    navigate("/teacher");
                }
                break;
            case "admin":
                if (
                    location.pathname !== "/admin" &&
                    !location.pathname.startsWith("/admin/")
                ) {
                    navigate("/admin");
                }
                break;
            default:
                navigate("/logout");
                return null;
        }
    }

    // Eğer oturum açılmamışsa, burada yönlendirme yapılabilir
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
};

export default App;
