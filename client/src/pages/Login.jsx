function Login() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 login-bg-color">
            <form className="d-flex flex-column w-25 gap-1 mx-auto mt-5 border p-3 rounded login-form-bg">
                <h1 className="text-center">Login Page</h1>

                <div className="mb-3">
                    <label htmlFor="login_type" className="form-label">
                        Giriş Türü
                    </label>
                    <select
                        className="form-select"
                        name="login_type"
                        id="login_type"
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
