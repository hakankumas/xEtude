import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        type: "",
    });

    const dispatch = useDispatch();
    const { username, type, session, message } = useSelector(
        (state) => state.auth
    );
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password || !formData.type)
            alert("Please fill all the fields");

        const condition = {
            username: formData.username,
            password: formData.password,
            type: formData.type,
        };
        setLoading(true);
        setTimeout(() => {
            dispatch(login(condition));
        }, 500);
    };

    useEffect(() => {
        if (session) {
            switch (type) {
                case "student":
                    navigate("/student");
                    break;
                case "parent":
                    navigate("/parent");
                    break;
                case "teacher":
                    navigate("/teacher");
                    break;
                case "admin":
                    navigate("/admin");
                    break;
            }
        } else {
            setError(message);
        }
        setLoading(false);
    }, [session, type, message, navigate]);
    if (loading) return <Spinner />;
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 login-bg-color">
            <form
                className="d-flex flex-column gap-1 mx-auto mt-5 border p-3 rounded login-form-bg col-12 col-md-8 col-xl-4"
                onSubmit={handleSubmit}
                method="POST"
            >
                <h1 className="text-center">Login Page</h1>
                {error && (
                    <div
                        className="alert alert-danger text-center"
                        role="alert"
                    >
                        {error}
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Giriş Türü
                    </label>
                    <select
                        className="form-select"
                        name="type"
                        id="type"
                        onChange={handleChange}
                        value={formData.type}
                    >
                        <option value="">Seçiniz</option>
                        <option value="student">Öğrenci</option>
                        <option value="parent">Veli</option>
                        <option value="teacher">Öğretmen</option>
                        <option value="admin">Yönetici</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Kullanıcı Adı
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        onChange={handleChange}
                        value={formData.username}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Şifre
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={formData.password}
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
