import React from "react";
import ActiveEtude from "../components/Teacher/ActiveEtude";
import CreateEtude from "../components/Teacher/CreateEtude";
import RequestEtude from "../components/Teacher/RequestEtude";

function Teacher() {
    return (
        <div>
            <div className="col-12 mx-5 d-flex flex-row gap-3 align-items-center">
                <h1>Teacher</h1>
                <RequestEtude />
                <ActiveEtude />
                <CreateEtude />
            </div>
            <hr />
        </div>
    );
}

export default Teacher;
