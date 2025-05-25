import axios from "axios";
import { useEffect, useState } from "react";

function Graphic1({ student_id }) {
    const [etudes, setEtudes] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/parent/student-enrolled-etudes/${student_id}`
            )
            .then((res) => {
                setEtudes(res.data.etudes);
            });
    }, [student_id]);

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
            const chartData = [["Ders", "Kayıt Sayısı"]];

            etudes.forEach((etude) => {
                chartData.push([etude.lesson_name, etude.count_enroll]);
            });

            const data =
                window.google.visualization.arrayToDataTable(chartData);

            const options = {
                title: "Etüt Kaydı Oluşturulan Dersler",
            };

            const chart = new window.google.visualization.PieChart(
                document.getElementById("piechart")
            );

            chart.draw(data, options);
        }
    }, [etudes]);

    return <div id="piechart" style={{ width: 900, height: 500 }}></div>;
}

export default Graphic1;
