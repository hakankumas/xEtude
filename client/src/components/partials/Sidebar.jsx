import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowRight, FaCog, FaHome, FaPowerOff } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    return (
        <div className="bg-dark text-white p-3" style={{ height: "100%" }}>
            <ul className="nav flex-column">
                {location.pathname && (
                    <>
                        <Link className="link home" to={location.pathname}>
                            EPS - {location.pathname}
                        </Link>
                        <hr />
                        <Link
                            className="link nav-link text-white d-flex align-items-center"
                            to={location.pathname}
                        >
                            <FaHome className="me-2" /> Ana Sayfa
                        </Link>
                        {location.pathname === "/student" && (
                            <>
                                <Link
                                    className="link nav-link text-white d-flex align-items-center"
                                    to={location.pathname + "/1"}
                                >
                                    <FaArrowRight className="me-2" /> /student/1
                                </Link>
                                <Link
                                    className="link nav-link text-white d-flex align-items-center"
                                    to={location.pathname + "/2"}
                                >
                                    <FaArrowRight className="me-2" /> /student/2
                                </Link>
                            </>
                        )}
                        {location.pathname === "/parent" && (
                            <>
                                <Link
                                    className="link nav-link text-white d-flex align-items-center"
                                    to="/parent/1"
                                >
                                    <FaArrowRight className="me-2" /> /parent/1
                                </Link>
                                <Link
                                    className="link nav-link text-white d-flex align-items-center"
                                    to="/parent/2"
                                >
                                    <FaArrowRight className="me-2" /> /parent/2
                                </Link>
                            </>
                        )}
                        {location.pathname === "/teacher" && (
                            <>
                                <Link
                                    className="link nav-link text-white d-flex align-items-center"
                                    to="/teacher/1"
                                >
                                    <FaArrowRight className="me-2" /> /teacher/1
                                </Link>
                                <Link
                                    className="link nav-link text-white d-flex align-items-center"
                                    to="/teacher/2"
                                >
                                    <FaArrowRight className="me-2" /> /teacher/2
                                </Link>
                            </>
                        )}
                        {location.pathname === "/admin" && (
                            <>
                                <Link
                                    className="link nav-link text-white d-flex align-items-center"
                                    to="/admin/1"
                                >
                                    <FaArrowRight className="me-2" /> /admin/1
                                </Link>
                                <Link
                                    className="link nav-link text-white d-flex align-items-center"
                                    to="/admin/2"
                                >
                                    <FaArrowRight className="me-2" /> /admin/2
                                </Link>
                            </>
                        )}
                        <Link
                            className="link nav-link text-white d-flex align-items-center"
                            to={location.pathname + "/settings"}
                        >
                            <FaCog className="me-2" /> Ayarlar
                        </Link>
                    </>
                )}
                <Link
                    className="link nav-link text-white d-flex align-items-center"
                    to="/logout"
                >
                    <FaPowerOff className="me-2" /> Çıkış
                </Link>
            </ul>
        </div>
    );
}

export default Sidebar;
