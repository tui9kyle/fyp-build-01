import { useState, useEffect } from "react";
import { TLDP } from "../../../library/tldp";

import "../../../styles/main.css";

const DataList = ({ tldp }) => {
    var data = [""];

    try {
        data = tldp.dataRaw;
        console.log(data);
    } catch (error) { }

    return (
        <div className="row">
            <h3>Data</h3>

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
