import React from "react";
import ActiveEtude from "../components/Student/ActiveEtude";
import RequestEtude from "../components/Student/RequestEtude";

function Student() {
    return (
        <div>
            <div className="col-12 mx-5 d-flex flex-row gap-3 align-items-center">
                <h1>Student</h1>
                <ActiveEtude />
                <RequestEtude />
            </div>
            <hr />
        </div>
    );
}

export default Student;
