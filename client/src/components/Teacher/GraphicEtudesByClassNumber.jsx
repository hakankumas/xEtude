import axios from "axios";
import { useEffect, useState } from "react";
function GraphicEtudesByClassNumber({ teacher_id }) {
    const [etudes, setEtudes] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/teacher/etudes-by-class-number/${teacher_id}`
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
            const chartData = [["Şube", "Kayıt Sayısı"]];

            etudes.forEach((etude) => {
                chartData.push([etude.class_number_rate, etude.count]);
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
                document.getElementById("graphicEtudesByClassNumber")
            );

            chart.draw(data, options);
        }
    }, [etudes]);

    return (
        <div>
            <div className="h3 fw-bold">Etüt Talebinde Bulunan Şubeler</div>
            <div
                id="graphicEtudesByClassNumber"
                style={{ width: "100%", height: "250px" }}
            ></div>
        </div>
    );
}

export default GraphicEtudesByClassNumber;
