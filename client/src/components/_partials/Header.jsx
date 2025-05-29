import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FaHome, FaPowerOff, FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

// Student
import Student_ActiveEtude from "../Student/ActiveEtude";
import Student_RequestEtude from "../Student/RequestEtude";
import Student_Notices from "../Student/Notices";

// Teacher
import Teacher_ActiveEtude from "../Teacher/ActiveEtude";
import Teacher_RequestEtude from "../Teacher/RequestEtude";
import Teacher_CreateEtude from "../Teacher/CreateEtude";

// Common Files
import Settings from "../Settings";

function Header() {
    const { pathname } = useLocation();
    const user_type = localStorage.getItem("type");
    const [childrenList, setChildrenList] = useState([]);

    useEffect(() => {
        if (user_type == 4) {
            const parent_id = localStorage.getItem("user_id");
            axios
                .get(`http://localhost:3000/parent/children-list/${parent_id}`)
                .then((res) => {
                    setChildrenList(res.data.children);
                });
        }
    }, []);

    return (
        <div className="bg-dark text-white p-3">
            <ul className="nav flex-row justify-content-start align-items-center gap-3">
                <Link
                    className="link home d-flex flex-column align-items-center"
                    to="/"
                >
                    <span>EPS</span>
                    <span className="fs-6">
                        <small>
                            {user_type == 1 && "Admin"}
                            {user_type == 2 && "Öğretmen"}
                            {user_type == 3 && "Öğrenci"}
                            {user_type == 4 && "Veli"}
                        </small>
                    </span>
                </Link>
                <Link
                    className={
                        "link d-flex align-items-center" +
                        (pathname === "/" ? " active_hover" : " text-white")
                    }
                    to="/"
                >
                    <FaHome className="me-2" /> Ana Sayfa
                </Link>
                {/* Teacher */}
                {user_type == 2 && (
                    <>
                        <Link
                            className={
                                "link d-flex align-items-center" +
                                (pathname === "/attend-list"
                                    ? " active_hover"
                                    : " text-white")
                            }
                            to="/attend-list"
                        >
                            <MdGroups className="me-2" /> Yoklama Listesi
                        </Link>
                        <div className="text-dark">
                            <Teacher_ActiveEtude />
                        </div>
                        <div className="text-dark">
                            <Teacher_RequestEtude />
                        </div>
                        <div className="text-dark">
                            <Teacher_CreateEtude />
                        </div>
                    </>
                )}
                {/* Student */}
                {user_type == 3 && (
                    <>
                        <Link
                            className={
                                "link d-flex align-items-center" +
                                (pathname === "/etude-request-list"
                                    ? " active_hover"
                                    : " text-white")
                            }
                            to="/etude-request-list"
                        >
                            <MdGroups className="me-2" /> Etüt Taleplerim
                        </Link>
                        <div className="text-dark">
                            <Student_ActiveEtude />
                        </div>
                        <div className="text-dark">
                            <Student_RequestEtude />
                        </div>
                        <div className="text-dark">
                            <Student_Notices />
                        </div>
                    </>
                )}
                {/* Parent */}
                {user_type == 4 && (
                    <>
                        {childrenList.map((child) => (
                            <Link
                                key={child.student_id}
                                className={
                                    "link d-flex align-items-center" +
                                    (pathname === `/child/${child.student_id}`
                                        ? " active_hover"
                                        : " text-white")
                                }
                                to={`/child/${child.student_id}`}
                            >
                                <FaUser className="me-2" />
                                {child.student_name +
                                    " " +
                                    child.student_surname}
                            </Link>
                        ))}
                    </>
                )}
                <div className="text-dark">
                    <Settings />
                </div>
                <Link className="d-flex align-items-center logout" to="/logout">
                    <FaPowerOff className="me-2" /> Çıkış Yap
                </Link>
            </ul>
        </div>
    );
}

export default Header;
