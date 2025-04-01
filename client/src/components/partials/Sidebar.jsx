import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

function Sidebar() {
    return (
        <div className="d-flex">
            <div
                className="bg-dark text-white vh-100 p-3"
                style={{ width: "250px" }}
            >
                <h4 className="mb-4">My Sidebar</h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <a
                            href="#"
                            className="nav-link text-white d-flex align-items-center"
                        >
                            <FaHome className="me-2" /> Home
                        </a>
                    </li>
                    <li className="nav-item mb-2">
                        <a
                            href="#"
                            className="nav-link text-white d-flex align-items-center"
                        >
                            <FaUser className="me-2" /> Profile
                        </a>
                    </li>
                    <li className="nav-item mb-2">
                        <a
                            href="#"
                            className="nav-link text-white d-flex align-items-center"
                        >
                            <FaCog className="me-2" /> Settings
                        </a>
                    </li>
                </ul>
            </div>
            <div className="p-4 w-100">
                <h2>Main Content</h2>
                <p>This is the main content area.</p>
            </div>
        </div>
    );
}

export default Sidebar;
