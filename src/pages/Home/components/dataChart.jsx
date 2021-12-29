import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { useState, useEffect, useRef } from "react";

const DataChart = ({ data }) => {
    useEffect(() => {}, [data]);
    const chartRef = useRef(null);
    var chartData;

    if (data["dataPerturbed"] != null) {
        chartData = {
            labels: Array(data["dataPerturbed"]["result"].length).fill(""),
            datasets: [
                {
                    label: "Perturbed Data",
                    lineTension: 0,
                    borderColor: "rgba(255,0,0,0.5)",
                    borderWidth: 0,
                    data: data["dataPerturbed"]["result"], //perturbed
                    pointRadius: 2,
                    pointBackgroundColor: "rgba(255,0,0,1)",
                    pointBorderColor: "rgba(255,0,0,1)",
                },
                {
                    label: "Original Data",
                    lineTension: 0,
                    borderColor: "rgba(0,0,255,0.5)",
                    borderWidth: 0,
                    data: data["dataRaw"], //raw
                    pointRadius: 2,
                    pointBackgroundColor: "rgba(0,0,255,1)",
                    pointBorderColor: "rgba(0,0,255,1)",
                },
            ],
        };

        var chartWidth =
            data["dataPerturbed"]["result"].length * 8 > 1000
                ? data["dataPerturbed"]["result"].length * 8
                : 1000;
        var chartHeight = 250;

        if (chartRef.current != null)
            chartRef.current.resize(chartWidth, chartHeight);
        return (
            <div className='overflow-x-scroll'>
                <Line
                    ref={chartRef}
                    data={chartData}
                    height={chartHeight}
                    width={chartWidth}
                    options={{
                        responsive: false,
                        maintainAspectRatio: false,
                        title: {
                            display: false,
                        },

                        scales: {
                            xAxis: {
                                // display: false,
                            },
                        },
                        // events: [],
                        plugins: {
                            // legend: {
                            //     // display: true,
                            // },
                            tooltip: {
                                // enabled: false,
                            },
                        },
                    }}
                />
            </div>
        );
    } else {
        return <></>;
    }
};

export default DataChart;
