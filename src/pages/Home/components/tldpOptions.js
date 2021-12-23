import { useState, useEffect } from "react";
import { TLDP } from "../../../library/tldp";

import "../../../styles/main.css";

const TldpOptions = ({ tldp, setTldp }) => {







    return (
        <div className="row">
            <h4 className="font-sans">TLDP Options</h4>

            <table>

                <tr>

                    <td>  <label className="">Mechanism</label></td>
                    <td>

                        <select>
                            <option value="" selected="selected">--Please choose an option--</option>
                            <option value="BPM">Backward Perturbation Mechanism</option>
                            <option value="FPM">Forward Perturbation Mechanism</option>

                        </select>

                    </td>

                </tr>
                <tr>

                    <td>  <label className="font-2">&epsilon;</label></td>
                    <td>        <input className="padding-75" type="number" min="0" step="0.01" /></td>

                </tr>
                <tr>

                    <td>  <label className="font-2">k</label></td>
                    <td>        <input className="padding-75" type="number" min="1" step="1" /></td>

                </tr>

                <tr>

                    <td colSpan="2">

                        <button className="font-mono font-1 padding-75">Set</button>
                    </td>
                </tr>

            </table>





        </div>
    );
};

export default TldpOptions;
