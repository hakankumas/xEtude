import React, { useState } from "react";

function HoursOfWork() {
    const days = [
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi",
        "Pazar",
    ];

    const [activeDays, setActiveDays] = useState(
        days.reduce((acc, day) => {
            acc[day] = false;
            return acc;
        }, {})
    );

    const handleCheckboxChange = (day) => {
        setActiveDays((prev) => ({
            ...prev,
            [day]: !prev[day],
        }));
    };

    return (
        <form>
            <div className="h5">Etüt Çalışma Saatleri</div>
            {days.map((day) => (
                <div
                    key={day}
                    className="d-flex flex-row align-items-center my-2"
                >
                    <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={activeDays[day]}
                        onChange={() => handleCheckboxChange(day)}
                    />
                    <label
                        className="form-label align-self-center me-3 mb-0"
                        style={{ width: "100px" }}
                    >
                        {day}
                    </label>
                    <input
                        type="time"
                        className="form-control w-25"
                        placeholder="Başlangıç"
                        disabled={!activeDays[day]}
                    />
                    <input
                        type="time"
                        className="form-control w-25 ms-2"
                        placeholder="Bitiş"
                        disabled={!activeDays[day]}
                    />
                </div>
            ))}
        </form>
    );
}

export default HoursOfWork;
