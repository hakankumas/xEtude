import { FaBook } from "react-icons/fa";

function Footer() {
    return (
        <div className="bg-secondary text-white">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-3 border-top">
                <p className="col-md-4 mb-0">
                    <em>2025 - Etüt Planlama Sistemi</em>
                </p>

                <a
                    href="/"
                    className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
                >
                    <FaBook />
                </a>

                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item">
                        <a href="#" className="link">
                            Ana Sayfa
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="link">
                            Öğrenciler
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="link">
                            Veliler
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="link">
                            Öğretmenler
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="link">
                            Yöneticiler
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer;
