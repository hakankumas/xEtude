import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Login from "../pages/Login";
import HeaderHome from "../components/partials/HeaderHome";
import Home from "../pages/home/Home";
import About from "../pages/home/About";
import Services from "../pages/home/Services";
import Contact from "../pages/home/Contact";
import Error from "../pages/Error";

function HomeRoutes() {
    const location = useLocation();
    if (location.pathname === "/login") return <Login />;
    return (
        <div>
            <HeaderHome />
            <div className="flex-grow-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </div>
    );
}

export default HomeRoutes;
