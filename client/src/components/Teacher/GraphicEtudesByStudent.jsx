import axios from "axios";
import { useEffect, useState } from "react";
function GraphicEtudesByStudent({ teacher_id }) {
    const [etudes, setEtudes] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/teacher/request-etudes-by-students/${teacher_id}`
            )
            .then((res) => {
                setEtudes(res.data.etudes);
            });
    }, [teacher_id]);

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
            const chartData = [["Öğrenci", "Kayıt Sayısı"]];

            etudes.forEach((etude) => {
                const name =
                    etude.student_name && etude.student_surname
                        ? `${etude.student_name} ${etude.student_surname}`
                        : "Genel";

                chartData.push([name, etude.count]);
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
                document.getElementById("graphicEtudesByStudent")
            );

            chart.draw(data, options);
        }
    }, [etudes]);

    return (
        <div>
            <div className="h3 fw-bold">Etüt Talebinde Bulunan Öğrenciler</div>
            <div
                id="graphicEtudesByStudent"
                style={{ width: "100%", height: "250px" }}
            ></div>
        </div>
    );
}

export default GraphicEtudesByStudent;
