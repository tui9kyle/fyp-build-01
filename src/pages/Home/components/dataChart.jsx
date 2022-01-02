import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { useState, useEffect, useRef } from "react";
import CustomColor from "./ldpOptions/customColor";

const DataChart = ({ data }) => {
    useEffect(() => {}, [data]);
    const chartRef = useRef(null);
    var chartData;

    if (data["dataPerturbed"][0] != null) {
        chartData = {
            labels: Array(data["dataPerturbed"][0]["result"].length).fill(""),
            datasets: [
                {
                    label: "Perturbed Data",
                    lineTension: 0,
                    borderColor: CustomColor.blue,
                    borderWidth: 0,
                    data: data["dataPerturbed"][0]["result"], //perturbed
                    pointRadius: 3,
                    pointBackgroundColor: CustomColor.blue,
                    pointBorderColor: CustomColor.blue,
                },
                {
                    label: "Original Data",
                    lineTension: 0,
                    borderColor: CustomColor.dull,
                    borderWidth: 0,
                    data: data["dataRaw"], //raw
                    pointRadius: 3,
                    pointBackgroundColor: CustomColor.dull,
                    pointBorderColor: CustomColor.dull,
                },
            ],
        };

        var chartWidth =
            data["dataPerturbed"][0]["result"].length * 8 > 1000
                ? data["dataPerturbed"]["result"].length * 8
                : 1000;
        var chartHeight = 250;

        if (chartRef.current != null)
            chartRef.current.resize(chartWidth, chartHeight);
        var test = data["dataPerturbed"]["result"];

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
                            y: {
                                suggestedMin: Math.min(
                                    ...data["dataPerturbed"][0]["result"]
                                ),
                                suggestedMax: Math.max(
                                    ...data["dataPerturbed"][0]["result"]
                                ),
                            },

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
