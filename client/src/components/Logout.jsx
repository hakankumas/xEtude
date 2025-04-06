import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import Spinner from "./Spinner";

function Logout() {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            dispatch(logout());
            navigate("/login");
            setLoading(false);
        }, 500);
    }, [navigate]);

    if (loading) return <Spinner />;
}

export default Logout;
