import { useState, useEffect } from "react";
import { TLDP } from "../../../library/tldp";

import "../../../styles/main.css";

const DataList = ({ tldp, k, epsilon, mechanism }) => {


    useEffect(() => {
        
    
    }, [tldp, k])


    var data = [""];

    try {
        data = tldp.dataRaw;
        console.log(data);
    } catch (error) { }

    return (

    
        <div className="row">


            <p className="font-mono">{mechanism} k={k} ε={epsilon}</p>
            <h3 className="font-sans">Data</h3>

            <table>
                <tr>
                    <th>Original Data</th>
                    <th>Perturbed Data</th>
                </tr>

                {data.map((d) => (
                    <tr>
                        <td className="font-mono">{d}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default DataList;
