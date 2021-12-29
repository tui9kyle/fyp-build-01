import { useState, useEffect, useRef } from "react";
import { Tldp } from "../../../library/tldp";

const TldpOptions = ({ setTldpOptions, setDataPerturbed, dataRaw }) => {
    const mRef = useRef();
    const eRef = useRef();
    const kRef = useRef();

    function ldpCompute() {
        var k = kRef.current.value;
        var epsilon = eRef.current.value;
        var mechanism = mRef.current.value;

        var result;

        if (mechanism == "BPM") {
            result = Tldp.BackwardPerturbationMechanism(dataRaw, k, epsilon);
        } else if (mechanism == "FPM") {
            result = Tldp.ForwardPerturbationMechanism(dataRaw, k, epsilon);
        }
        setTldpOptions({ k, epsilon, mechanism });
        setDataPerturbed(result);
    }

    return (
        <div className="row">
            <h4 className="font-sans">TLDP Options</h4>

            <table>
                <tbody>
                    <tr>
                        <td>
                            {" "}
                            <label>Mechanism</label>
                        </td>
                        <td>
                            <select
                                ref={mRef}
                                defaultValue=""
                                className="form-select rounded bg-background text-foreground"
                            >
                                <option value="">
                                    --Please choose an option--
                                </option>
                                <option value="BPM">
                                    Backward Perturbation Mechanism
                                </option>
                                <option value="FPM">
                                    Forward Perturbation Mechanism
                                </option>

                                <option value="TM">Threshold Mechanism</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {" "}
                            <label className="font-mono">&epsilon;</label>
                        </td>
                        <td>
                            {" "}
                            <input
                                ref={eRef}
                                className="form-input rounded bg-background text-foreground"
                                type="number"
                                min="0"
                                step="0.01"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {" "}
                            <label className="font-mono">k</label>
                        </td>
                        <td>
                            {" "}
                            <input
                                ref={kRef}
                                className="form-input rounded bg-background text-foreground s"
                                type="number"
                                min="1"
                                step="1"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            <button
                                onClick={ldpCompute}
                                className="font-mono  text-gray-100 block bg-gray-900 my-5 mr-4 py-2 px-5 rounded-full border-0 hover:bg-gray-600"
                            >
                                Set
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TldpOptions;
