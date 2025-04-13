import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowRight, FaCog, FaHome, FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="bg-dark text-white p-3" style={{ height: "100%" }}>
            <ul className="nav flex-column">
                <Link className="link home" to="/">
                    EPS
                </Link>
                <Link
                    className="link nav-link text-white d-flex align-items-center"
                    to="/"
                >
                    <FaHome className="me-2" /> Ana Sayfa
                </Link>
                <Link
                    className="link nav-link text-white d-flex align-items-center"
                    to="/settings"
                >
                    <FaCog className="me-2" /> Ayarlar
                </Link>
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
