import React from "react";

function Header() {
    return (
        <div
            className="d-flex flex-row justify-content-betweenx bg-light py-1 gap-3"
            style={{ textDecoration: "none" }}
        >
            <a className="text-decoration-none text-dark" href="/">
                Etüt Planlama Sistemi
            </a>
            <a className="text-decoration-none text-dark" href="/settings">
                Ayarlar
            </a>
            <a className="text-decoration-none text-dark" href="/logout">
                Çıkış
            </a>
        </div>
    );
}

export default Header;
