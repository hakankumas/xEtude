import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./scss/index.scss";

import { Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default App;
