import axios from "axios";
import { useEffect, useState } from "react";
function GraphicCountEtudeByClassNumber() {
    const [etudes, setEtudes] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/admin/count-etude-by-class-number`)
            .then((res) => {
                setEtudes(res.data.etudes);
            });
    }, []);

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
                document.getElementById("graphicCountEtudeByClassNumber")
            );

            chart.draw(data, options);
        }
    }, [etudes]);

    return (
        <div>
            <div className="h3 fw-bold">Şubelere Göre Katılım</div>
            <div
                id="graphicCountEtudeByClassNumber"
                style={{ width: "100%", height: "250px" }}
            ></div>
        </div>
    );
}

export default GraphicCountEtudeByClassNumber;
