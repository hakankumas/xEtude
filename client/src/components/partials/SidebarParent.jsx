import "bootstrap/dist/css/bootstrap.min.css";
import { FaCog, FaHome, FaPowerOff, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
function SidebarParent() {
    const parent_id = localStorage.getItem("user_id");
    const [childrenList, setChildrenList] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/parent/children-list/${parent_id}`)
            .then((res) => {
                setChildrenList(res.data.children);
            });
    }, []);
    console.log(childrenList);
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

                {childrenList.map((child) => (
                    <Link
                        key={child.student_id}
                        className="link nav-link text-white d-flex align-items-center"
                        to={`/child/${child.student_id}`}
                    >
                        <FaUser className="me-2" />
                        {child.student_name + " " + child.student_surname}
                    </Link>
                ))}

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

export default SidebarParent;
