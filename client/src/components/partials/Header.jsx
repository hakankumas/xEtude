import React from "react";

function Header() {
    return (
        <div
            className="d-flex flex-row justify-content-betweenx bg-light py-1 gap-3"
            style={{ textDecoration: "none" }}
        >
            <a className="text-decoration-none text-dark" href="/">
                home
            </a>
            <a className="text-decoration-none text-dark" href="/student">
                student
            </a>
            <a className="text-decoration-none text-dark" href="/parent">
                parent
            </a>
            <a className="text-decoration-none text-dark" href="/teacher">
                teacher
            </a>
            <a className="text-decoration-none text-dark" href="/admin">
                admin
            </a>
        </div>
    );
}

export default Header;
