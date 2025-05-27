import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function GraphicEnrollAttendStatus() {
    const { mine_etudes } = useSelector((state) => state.student);
    const [etudes, setEtudes] = useState([]);
    const student_id = localStorage.getItem("user_id");

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/student/etude-enrolled-for-attend-status/${student_id}`
            )
            .then((res) => {
                setEtudes(res.data.etudes);
            });
    }, [mine_etudes]);

    useEffect(() => {
        if (etudes.length === 0) return;

        // Google Charts loader'ı zaten yüklendiyse tekrar yükleme
        if (!window.google || !window.google.charts) {
            const script = document.createElement("script");
            script.src = "https://www.gstatic.com/charts/loader.js";
            script.onload = () => drawChartWithGoogle();
            document.body.appendChild(script);
        } else {
            drawChartWithGoogle();
        }

        function drawChartWithGoogle() {
            window.google.charts.load("current", {
                packages: ["corechart"],
            });
            window.google.charts.setOnLoadCallback(drawChart);
        }

        function drawChart() {
            const chartData = [["Katılım Durumu", "Kayıt Sayısı"]];

            etudes.forEach((etude) => {
                chartData.push([etude.etude_attend_status, etude.count]);
            });

            const data =
                window.google.visualization.arrayToDataTable(chartData);

            const options = {
                chartArea: {
                    left: 20,
                    top: 20,
                    width: "100%",
                    height: "100%",
                },
            };

            const chart = new window.google.visualization.PieChart(
                document.getElementById("graphicEnrollAttendStatus")
            );

            chart.draw(data, options);
        }
    }, [etudes]);

    return (
        <div>
            <div className="h3 fw-bold">Katılım Durumu</div>
            <div
                id="graphicEnrollAttendStatus"
                style={{ width: "100%", height: "250px" }}
            ></div>
        </div>
    );
}

export default GraphicEnrollAttendStatus;
