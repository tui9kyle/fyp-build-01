import { useState, useEffect } from "react";
import { CustomColor, CustomColors } from "../../Home/components/ldpOptions/customColor";

const DataList = ({ datalist, idx, dataTimestampConfig }) => {
    useEffect(() => {}, [datalist]);

    if (datalist != null) {
        if (idx == "raw") {
            return (
                <div className='basis-1/4'>
                    <table className='mx-auto'>
                        {/* <thead>
                            <tr>
                                <th></th>
                                <th
                                    className='px-2'
                                    style={{ color: CustomColor.dull }}
                                >
                                    Original Data
                                </th>
                            </tr>
                        </thead> */}
                        <tbody>
                            {datalist.map((d, idx) => (
                                <tr className="text-right">
                                    <td className='font-mono text-xs text-gray-400 pr-1 text-right font-light'>
                                        {idx}
                                    </td>

                                    <td className='font-mono text-right text-slate-600 text-sm font-light pr-3'>
                                        { (dataTimestampConfig.interval) ? idx * dataTimestampConfig.interval : null}
                                    </td>
                                    <td className='font-mono text-center'>
                                        {d}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className='basis-1/6'>
                    <table className='mx-auto'>
                        {/* <thead>
                            <tr>
                                <th
                                    className='px-2'
                                    style={{ color: CustomColors[idx] }}
                                >
                                    Perturbed Data {idx + 1}
                                </th>
                            </tr>
                        </thead> */}
                        <tbody>
                            {datalist.map((d) => (
                                <tr>
                                    <td className='font-mono text-center'>
                                        {d}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    } else return <></>;
};

export default DataList;
