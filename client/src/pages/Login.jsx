import React from "react";

function Login() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 login-bg-color">
            <form
                action=""
                method="post"
                className="d-flex flex-column w-25 gap-1 mx-auto mt-5 border p-3 rounded login-form-bg"
            >
                <h1 className="text-center">Login Page</h1>

                <div class="mb-3">
                    <label for="login_type" class="form-label">
                        Giriş Türü
                    </label>
                    <select
                        class="form-select"
                        name="login_type"
                        id="login_type"
                    >
                        <option selected value="student">
                            Öğrenci
                        </option>
                        <option value="parent">Veli</option>
                        <option value="teacher">Öğretmen</option>
                        <option value="admin">Yönetici</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="username" class="form-label">
                        Kullanıcı Adı
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        name="username"
                        id="username"
                        aria-describedby="username"
                    />
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">
                        Şifre
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        name="password"
                        id="password"
                        aria-describedby="password"
                    />
                </div>

                <div class="mb-3 text-end">
                    <button type="submit" className="btn btn-success">
                        Giriş Yap
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
