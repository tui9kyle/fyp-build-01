import { useState, useEffect } from "react";
import { TldpUtilities } from "../../../library/tldp";




const DataList = ({ tldp, k, epsilon, mechanism }) => {
    var data = [];
    var dataPerturbed = [];
    var probabilities = [];
    useEffect(() => { }, [tldp, k, epsilon, mechanism])


    if (mechanism == "BPM" && k > 0 && epsilon > 0) {


        tldp.BackwardPerturbationMechanism(k, epsilon);
        data = tldp.dataRaw;
        dataPerturbed = tldp.dataPerturbed;
        probabilities = tldp.probabilities;
        return (


            <div className="row">


                <p className="font-mono ">{mechanism} k={k} ε={epsilon}</p>
                <p className="font-mono">P(0) {TldpUtilities.PerturbationProbability(epsilon, k, 0)}</p>
                <p className="font-mono">P(j) {TldpUtilities.PerturbationProbability(epsilon, k, 1)}</p>






                <h3 className="font-sans">Data</h3>

                <table>


                    <thead>

                        <tr>
                            <th></th>
                            <th className="px-3">Original Data</th>
                            <th className="px-3">Perturbed Data</th>
                            <th className="px-3">P</th>
                        </tr>
                    </thead>
                    <tbody>

                        {


                            dataPerturbed.map((d, idx) => (
                                <tr>
                                    <td className="font-mono text-center">{idx}</td>
                                    <td className="font-mono text-center">{data[idx]}</td>
                                    <td className="font-mono text-center">{d}</td>
                                    <td className="font-mono" >{probabilities[idx]}</td>
                                </tr>
                            ))}


                    </tbody>
                </table>
            </div>
        );
    }


    else return (<>nothing</>);
};

export default DataList;
