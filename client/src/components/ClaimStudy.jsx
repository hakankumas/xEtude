import React from "react";

function ClaimStudy() {
    return (
        <div>
            <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#claimStudy"
            >
                Etüt Talebi Oluştur
            </button>
            <div
                class="modal fade"
                id="claimStudy"
                tabindex="-1"
                aria-labelledby="claimStudyModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1
                                class="modal-title fs-5"
                                id="claimStudyModalLabel"
                            >
                                Etüt Talebi Oluştur
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            {/* prettier-ignore */}
                            <form action="" method="post">
                                <div class="mb-3">
                                    <label class="form-label">Ders</label>
                                    <select class="form-select">
                                        <option value=""></option>
                                        <option value="">Türk Dili ve Edebiyatı</option>
                                        <option value="">Matematik</option>
                                        <option value="">Tarih</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Öğretmen</label>
                                    <select class="form-select">
                                        <option value=""></option>
                                        <option value="">Ali YILMAZ</option>
                                        <option value="">Arif İNCE</option>
                                        <option value="">Ayşenur KAYA</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Tarih</label>
                                    <input type="date" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Saat</label>
                                    <input type="time" class="form-control" />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">
                                Tamam
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClaimStudy;
