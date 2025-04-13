import React from "react";

function HeaderHome() {
    return (
        <div
            className="d-flex flex-row justify-content-betweenx bg-light py-1 gap-3"
            style={{ textDecoration: "none" }}
        >
            <a className="text-decoration-none text-dark" href="/">
                Etüt Planlama Sistemi
            </a>
            <a className="text-decoration-none text-dark" href="/about">
                Hakkımızda
            </a>
            <a className="text-decoration-none text-dark" href="/services">
                Hizmetlerimiz
            </a>
            <a className="text-decoration-none text-dark" href="/contact">
                İletişim
            </a>
            <a
                className="text-decoration-none bg-success text-dark px-3"
                href="/login"
            >
                Login
            </a>
        </div>
    );
}

export default HeaderHome;
