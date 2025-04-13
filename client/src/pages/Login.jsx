import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        input_username: "",
        input_password: "",
    });

    const dispatch = useDispatch();
    const { session, message } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.input_username || !formData.input_password) {
            alert("Lütfen tüm alanları doldurun");
            return;
        }

        const condition = {
            username: formData.input_username,
            password: formData.input_password,
        };

        setLoading(true);
        setTimeout(() => {
            dispatch(login(condition));
        }, 500);
    };

    useEffect(() => {
        if (session) {
            navigate("/");
        } else if (message) {
            setError(message);
            setLoading(false);
        }
    }, [session, message, navigate]);

    if (loading) return <Spinner />;

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 login-bg-color">
            <form
                className="d-flex flex-column gap-1 mx-auto mt-5 border p-3 rounded login-form-bg col-12 col-md-8 col-xl-4"
                onSubmit={handleSubmit}
                method="POST"
            >
                <h1 className="text-center">Giriş Yap</h1>
                {error && (
                    <div
                        className="alert alert-danger text-center"
                        role="alert"
                    >
                        {error}
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="input_username" className="form-label">
                        Kullanıcı Adı
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="input_username"
                        id="input_username"
                        onChange={handleChange}
                        value={formData.input_username}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="input_password" className="form-label">
                        Şifre
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="input_password"
                        onChange={handleChange}
                        value={formData.input_password}
                    />
                </div>

                <div className="mb-3 text-end">
                    <button type="submit" className="btn btn-success">
                        Giriş Yap
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
