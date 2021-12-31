import { useState, useEffect } from "react";

const DataList = ({ data, ldpOptions }) => {
    useEffect(() => {}, [data, ldpOptions]);

    if (data != null && ldpOptions != null) {
        return (
            <div className='row'>
                {/* <p className='font-mono '>
                    {tldpOptions.mechanism} k={tldpOptions.k} ε=
                    {tldpOptions.epsilon}
                </p>
                <p className='font-mono'>
                    P(0){" "}
                    {TldpUtilities.PerturbationProbability(
                        tldpOptions.epsilon,
                        tldpOptions.k,
                        0
                    )}
                </p>
                <p className='font-mono'>
                    P(j){" "}
                    {TldpUtilities.PerturbationProbability(
                        tldpOptions.epsilon,
                        tldpOptions.k,
                        1
                    )}
                </p> */}

                <h3 className='font-sans'>Data</h3>

                <table>
                    <thead>
                        <tr>
                            <th>S</th>
                            <th className='px-3 text-blue-500'>
                                Original Data
                            </th>
                            <th className='px-3 text-red-500'>
                                Perturbed Data
                            </th>
                            <th className='px-3'>P</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data["dataPerturbed"]["result"].map((d, idx) => (
                            <tr>
                                <td className='font-mono text-center'>{idx}</td>
                                <td className='font-mono text-center'>
                                    {data["dataRaw"][idx]}
                                </td>
                                <td className='font-mono text-center'>{d}</td>
                                <td className='font-mono'>
                                    {data["dataPerturbed"]["debugArr"][idx]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else return <></>;
};

export default DataList;
