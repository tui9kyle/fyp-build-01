import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { useState, useEffect, useRef } from "react";

const DataChart = ({ data }) => {
    useEffect(() => {}, [data]);
    const chartRef = useRef(null);
    let chartDatasets = [];
    let chartLabels;
    let chartMin, chartMax, chartWidth, chartHeight;
    let chartWidthScale = 5;

    chartHeight = 250;

    if (data["dataRaw"] != null) {
        chartMin = Math.min(...data["dataRaw"]);
        chartMax = Math.max(...data["dataRaw"]);
        chartLabels = Array(data["dataRaw"].length).fill("");
        chartWidth =
            chartLabels.length * chartWidthScale > 1000
                ? chartLabels.length * chartWidthScale
                : 1000;
        chartDatasets = [
            ...chartDatasets,
            {
                label: "Original Data",
                lineTension: 0,
                borderColor: "rgba(200, 200, 200,0.8)",
                borderWidth: 0.5,
                data: data["dataRaw"], //raw
                pointRadius: 2,
                pointBackgroundColor: "rgba(200, 200, 200,0.8)",
                pointBorderColor: "rgba(200, 200, 200,0.8)",
                order: 1,
            },
        ];
    }

    for (let i = 0; i < data["dataPerturbed"].length; i++) {
        let r = data["dataPerturbed"][i]["result"];
        // chart config
        if (Math.min(...r) < chartMin) {
            chartMin = Math.min(...r);
        }
        if (Math.max(...r) > chartMax) {
            chartMin = Math.max(...r);
        }
        if (r.length > chartLabels.length) {
            chartLabels = Array(r.length).fill("");
            chartWidth =
                chartLabels.length * chartWidthScale > 1000
                    ? chartLabels.length * chartWidthScale
                    : 1000;
        }

        // data
        chartDatasets = [
            ...chartDatasets,
            {
                label: "Perturbed Data " + (i + 1),
                lineTension: 0,
                borderColor: "hsla(" + 80 * i + ", 100%, 40%, 0.8)",
                borderWidth: 0.5,
                data: r,
                pointRadius: 2,
                pointBackgroundColor: "hsla(" + 80 * i + ", 100%, 40%, 0.8)",
                pointBorderColor: "hsla(" + 80 * i + ", 100%, 40%, 0.8)",
                order: 0 - i,
            },
        ];
    }

    if (chartRef.current != null)
        chartRef.current.resize(chartWidth, chartHeight);
    if (chartLabels == null)
        return (
            <div className='overflow-x-scroll'>
                <Line
                    ref={chartRef}
                    data={{
                        labels: [],
                        datasets: [],
                    }}
                    options={{
                        responsive: false,
                        maintainAspectRatio: false,
                        title: {
                            display: false,
                        },
                    }}
                />
            </div>
        );
    else {
        return (
            <div className='overflow-x-scroll'>
                <Line
                    ref={chartRef}
                    data={{ labels: chartLabels, datasets: chartDatasets }}
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
                                suggestedMin: chartMin,
                                suggestedMax: chartMax,
                            },
                        },
                    }}
                />
            </div>
        );
    }

    // if (data["dataPerturbed"][0] != null) {
    //     chartDatasets = {
    //         labels: Array(data["dataPerturbed"][0]["result"].length).fill(""),
    //         datasets: [
    //             {
    //                 label: "Perturbed Data",
    //                 lineTension: 0,
    //                 borderColor: CustomColor.blue,
    //                 borderWidth: 0,
    //                 data: data["dataPerturbed"][0]["result"], //perturbed
    //                 pointRadius: 3,
    //                 pointBackgroundColor: CustomColor.blue,
    //                 pointBorderColor: CustomColor.blue,
    //             },
    //             {
    //                 label: "Original Data",
    //                 lineTension: 0,
    //                 borderColor: CustomColor.dull,
    //                 borderWidth: 0,
    //                 data: data["dataRaw"], //raw
    //                 pointRadius: 3,
    //                 pointBackgroundColor: CustomColor.dull,
    //                 pointBorderColor: CustomColor.dull,
    //             },
    //         ],
    //     };

    // var chartWidth =
    //     data["dataPerturbed"][0]["result"].length * 8 > 1000
    //         ? data["dataPerturbed"]["result"].length * 8
    //         : 1000;
    // var chartHeight = 250;

    // if (chartRef.current != null)
    //     chartRef.current.resize(chartWidth, chartHeight);
    // var test = data["dataPerturbed"]["result"];

    // return (
    //     <div className='overflow-x-scroll'>
    //         <Line
    //             ref={chartRef}
    //             data={{ labels: chartLabels, datasets: chartDatasets }}
    //             height={chartHeight}
    //             width={chartWidth}
    //             options={{
    //                 responsive: false,
    //                 maintainAspectRatio: false,
    //                 title: {
    //                     display: false,
    //                 },

    //                 scales: {
    //                     y: {
    //                         suggestedMin: Math.min(
    //                             ...data["dataPerturbed"][0]["result"]
    //                         ),
    //                         suggestedMax: Math.max(
    //                             ...data["dataPerturbed"][0]["result"]
    //                         ),
    //                     },
    //                 },
    //             }}
    //         />
    //     </div>
    // );
};

export default DataChart;
