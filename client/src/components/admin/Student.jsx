import React, { useEffect, useState } from "react";
import axios from "axios";
function Admin() {
    const [students, setStudents] = useState([]);
    const [parents, setParents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [admins, setAdmins] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getDatas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:3000/admin");
            setStudents(response.data.students);
            setParents(response.data.parents);
            setTeachers(response.data.teachers);
            setAdmins(response.data.admins);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatas();
    }, []);

    console.log({
        students,
        parents,
        teachers,
        admins,
    });

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            <pre>{JSON.stringify(students, null, 2)}</pre>
            <pre>{JSON.stringify(parents, null, 2)}</pre>
            <pre>{JSON.stringify(teachers, null, 2)}</pre>
            <pre>{JSON.stringify(admins, null, 2)}</pre>
        </div>
    );
}

export default Admin;
