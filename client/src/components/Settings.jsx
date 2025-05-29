import { useEffect, useState } from "react";
import axios from "axios";
import { useCustomSnackBar } from "../hooks/useCustomSnackBar";
import useModalCloseListener from "../hooks/useStateEmpty";
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
        if (!password) {
            snackBar_error();
            return;
        }
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

    useModalCloseListener("settings", () => {
        setPassword("");
    });

    return (
        <div>
            <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#settings"
            >
                Ayarlar
            </button>
            <div className="modal fade" id="settings">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-2"
                                id="settingsModalLabel"
                            >
                                Ayarlar
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-12 p-3">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Kullanıcı Adınız
                                    </label>
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
                                    <label className="form-label">
                                        Soyadınız
                                    </label>
                                    <input
                                        className="form-control"
                                        placeholder={userInfo.surname || ""}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Kullanıcı Türünüz
                                    </label>
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
                                        <label className="form-label">
                                            Sınıfınız
                                        </label>
                                        <input
                                            className="form-control"
                                            placeholder={`${userInfo.class_number}. Sınıf`}
                                            disabled
                                        />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Şifreniz
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handlePassword}
                                data-bs-dismiss="modal"
                            >
                                Tamam
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
