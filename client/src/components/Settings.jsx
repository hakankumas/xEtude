import { useEffect, useState } from "react";
import axios from "axios";
import { useCustomSnackBar } from "../hooks/useCustomSnackBar";
function Settings() {
    const { snackBar_success, snackBar_error } = useCustomSnackBar();
    const user_id = localStorage.getItem("user_id");
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/user/get/${user_id}`
                );
                setUserInfo(response.data.user[0]);
            } catch (error) {
                console.error("Kullanıcı bilgileri alınamadı:", error);
            }
        };
        fetchUser();
    }, []);

    const [password, setPassword] = useState("");

    const handlePassword = async () => {
        try {
            const condition = {
                id: user_id,
                password: password,
            };
            const response = await axios.post(
                `http://localhost:3000/user/update-password`,
                condition
            );
            snackBar_success();
        } catch (error) {
            console.error(error.message);
            snackBar_error();
        }
    };

    return (
        <div className="col-4 p-3">
            <form action="" className="border rounded-3 p-3">
                <h2 className="mb-3">Bilgilerim</h2>
                <div className="mb-3">
                    <label className="form-label">Kullanıcı Adınız</label>
                    <input
                        className="form-control"
                        placeholder={userInfo.username || ""}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Adınız</label>
                    <input
                        className="form-control"
                        placeholder={userInfo.name || ""}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Soyadınız</label>
                    <input
                        className="form-control"
                        placeholder={userInfo.surname || ""}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Kullanıcı Türünüz</label>
                    <input
                        className="form-control"
                        placeholder={
                            userInfo.type === 1
                                ? "Yönetici"
                                : userInfo.type === 2
                                ? "Öğretmen"
                                : userInfo.type === 3
                                ? "Öğrenci"
                                : userInfo.type === 4
                                ? "Veli"
                                : ""
                        }
                        disabled
                    />
                </div>
                {userInfo.type == 3 && (
                    <div className="mb-3">
                        <label className="form-label">Sınıfınız</label>
                        <input
                            className="form-control"
                            placeholder={`${userInfo.class_number}. Sınıf`}
                            disabled
                        />
                    </div>
                )}
                <div className="mb-3">
                    <label className="form-label">Şifreniz</label>
                    <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handlePassword} className="btn btn-primary">
                    Güncelle
                </button>
            </form>
        </div>
    );
}

export default Settings;
