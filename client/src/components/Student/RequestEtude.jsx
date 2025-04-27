import React, { useState } from "react";

function RequestEtude() {
    const [isPrivate, setIsPrivate] = useState("");

    return (
        <div>
            <button
                type="button"
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#requestEtude"
            >
                Etüt Talebi Oluştur
            </button>
            <div
                className="modal fade"
                id="requestEtude"
                tabIndex="-1"
                aria-labelledby="requestEtudeModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="requestEtudeModalLabel"
                            >
                                Etüt Talebi Oluştur
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Öğretmen
                                    </label>
                                    <select className="form-select">
                                        <option value=""></option>
                                        <option value="Ali YILMAZ">
                                            Ali YILMAZ
                                        </option>
                                        <option value="Arif İNCE">
                                            Arif İNCE
                                        </option>
                                        <option value="Ayşenur KAYA">
                                            Ayşenur KAYA
                                        </option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Özel Etüt
                                    </label>
                                    <select
                                        className="form-select"
                                        value={isPrivate}
                                        onChange={(e) =>
                                            setIsPrivate(e.target.value)
                                        }
                                    >
                                        <option value=""></option>
                                        <option value="1">Evet</option>
                                        <option value="0">Hayır</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tarih</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        disabled={isPrivate !== "1"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Başlangıç Saati
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        disabled={isPrivate !== "1"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Bitiş Saati
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        disabled={isPrivate !== "1"}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">
                                Tamam
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestEtude;
