import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./scss/index.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { is_session } from "./redux/features/auth/authSlice";
import Logout from "./components/Logout";

// Routes
import HomeRoutes from "./routes/HomeRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import ParentRoutes from "./routes/ParentRoutes";

function App() {
    const { session, type } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(is_session());
    }, [session]);
    const routesType = () => {
        switch (type) {
            case "1":
                return <AdminRoutes />;
            case "2":
                return <TeacherRoutes />;
            case "3":
                return <StudentRoutes />;
            case "4":
                return <ParentRoutes />;
            default:
                return <HomeRoutes />;
        }
    };

    if (location.pathname === "/logout") return <Logout />;

    return (
        <div className="d-flex flex-column min-vh-100">
            {session ? routesType() : <HomeRoutes />}
        </div>
    );
}

export default App;
