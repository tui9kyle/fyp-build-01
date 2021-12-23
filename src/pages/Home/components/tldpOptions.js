import { useState, useEffect } from "react";
import { TLDP } from "../../../library/tldp";

import "../../../styles/main.css";

const TldpOptions = ({ }) => {



    return (
        <div className="row">
            <h4 className="font-sans">TLDP Options</h4>

            <table>


                <tr>

                    <td>  <label className="font-2">&epsilon;</label></td>
                    <td>        <input className="padding-75" type="number" /></td>

                </tr>
                <tr>

                    <td>  <label className="font-2">k</label></td>
                    <td>        <input className="padding-75" type="number" /></td>

                </tr>


            </table>




        </div>
    );
};

export default TldpOptions;
