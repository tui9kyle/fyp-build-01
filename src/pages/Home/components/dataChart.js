import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { useState, useEffect } from "react";




const DataChart = ({ tldp, k, epsilon, mechanism }) => {
    useEffect(() => {

    }, [tldp,  k, epsilon, mechanism])


    var data;

    try {
        data = {
            labels: tldp.dataRaw,
            datasets: [
                {

                    lineTension: 0,
                    borderColor: "rgba(0,0,255,0.1)",
                    borderWidth: 1.5,
                    data: tldp.dataRaw,
                    pointRadius: 1,
                    pointBorderColor: "rgba(0,0,255,.5)",
                },
                {

                    lineTension: 0,
                    borderColor: "rgba(255,255,0,0.1)",
                    borderWidth: 1.5,
                    data: tldp.dataPerturbed,
                    pointRadius: 1,
                    pointBorderColor: "rgba(255,255,0,.8)",

                },
            ],
        };

        return (
            <Line
                data={data}
                options={{
                    title: {
                        display: false,
                    },

                    scales: {
                        xAxis: {
                            display: false,
                        },
                    },
                    events: [],
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            display: false,
                        },
                    },
                }}
            />
        );

    }
    catch (error) {
        return (
            <></>
        )
    }



};

export default DataChart;
