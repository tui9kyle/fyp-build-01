import { useState, useEffect } from "react";
import { TLDP } from "../../../library/tldp";

import "../../../styles/main.css";

const DataList = ({ tldp, k, epsilon, mechanism }) => {

    var dataPerturbed = [];

    useEffect(() => {


    }, [tldp, k, epsilon])


    var data = [""];

    try {
        data = tldp.dataRaw;
        console.log(data);
        dataPerturbed = tldp.BackwardPerturbationMechanism(k, epsilon);
    } catch (error) { }




    return (


        <div className="row">


            <p className="font-mono">{mechanism} k={k} ε={epsilon}</p>
            <h3 className="font-sans">Data</h3>

            <table>
                <tr>
                    <th></th>
                    <th>Original Data</th>
                    <th>Perturbed Data</th>
                </tr>

                {


                    dataPerturbed.map((d, idx) => (
                        <tr>
                            <td className="font-mono">{idx}</td>
                            <td className="font-mono">{data[idx]}</td>
                            <td className="font-mono">{d}</td>
                        </tr>
                    ))}
            </table>
        </div>
    );
};

export default DataList;
