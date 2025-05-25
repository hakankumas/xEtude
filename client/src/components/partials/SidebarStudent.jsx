import "bootstrap/dist/css/bootstrap.min.css";
import { FaCog, FaHome, FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdGroups } from "react-icons/md";
function SidebarStudent() {
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
                    to="/etude-request-list"
                >
                    <MdGroups className="me-2" /> Etüt Taleplerim
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

export default SidebarStudent;
