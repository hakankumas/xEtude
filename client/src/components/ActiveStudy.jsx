import React from "react";
import { FaCheck } from "react-icons/fa";

function ActiveStudy() {
    return (
        <div>
            <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#activeStudy"
            >
                Aktif Etütler
            </button>
            <div
                class="modal fade"
                id="activeStudy"
                tabindex="-1"
                aria-labelledby="activeStudyModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1
                                class="modal-title fs-5"
                                id="activeStudyModalLabel"
                            >
                                Aktif Etütler
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
                            <div
                                class="table-responsive"
                            >
                                <table
                                    class="table table-bordered table-hover"
                                >
                                    <thead>
                                        <tr>
                                            <th className="col-3">Ders</th>
                                            <th className="col-4">Öğretmen</th>
                                            <th className="col-4 text-center">Tarih</th>
                                            <th className="col-1 text-center">Kişi</th>
                                            <th className="col-1 text-center">Kaydol</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="">
                                            <td>Lorem 1</td>
                                            <td>İpsum Dolar 1</td>
                                            <td className="text-center">Sit 1</td>
                                            <td className="text-center">3/5</td>
                                            <td className="text-center"><FaCheck className="text-success"/></td>
                                        </tr>
                                        <tr class="">
                                            <td>Lorem 2</td>
                                            <td>İpsum Dolar 2</td>
                                            <td className="text-center">Sit 2</td>
                                            <td className="text-center">1/5</td>
                                            <td className="text-center"><FaCheck className="text-success"/></td>
                                        </tr>
                                        <tr class="">
                                            <td>Lorem 3</td>
                                            <td>İpsum Dolar 3</td>
                                            <td className="text-center">Sit 3</td>
                                            <td className="text-center">4/5</td>
                                            <td className="text-center"><FaCheck className="text-success"/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActiveStudy;
