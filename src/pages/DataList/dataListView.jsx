import { useState } from "react";

import DataList from "./components/dataList";

const DataListView = ({
    dataRaw,
    dataPerturbed,
    dataFileMeta,
    DatasetConfigList,
    ldpOptions,
    dataTimestampConfig,
}) => {
    return (
        <>
            <div className='app'>
                {/* File Meta */}
                <div className='flex flex-row flex-nowrap'>
                    <div>
                        File:{" "}
                        <span className='font-mono'>
                            {dataFileMeta.filename}
                        </span>
                    </div>
                </div>

                <div className='flex flex-row flex-nowrap'>
                    <div>
                        Format:{" "}
                        <span className='font-mono'>{dataFileMeta.format}</span>
                    </div>
                </div>

                {/* Timestamp Config */}

                <div className='flex flex-row items-center'>
                    <div className='basis-1/7 pr-2'>
                        <label className='font-sans'>Interval</label>
                    </div>

                    <div className='grow-0 px-2'>
                        <input
                            className='form-input rounded bg-background text-foreground'
                            type='number'
                            value={dataTimestampConfig.interval}
                            onChange={(e) => {
                                dataTimestampConfig.setInterval(
                                    parseFloat(e.target.value)
                                );
                            }}
                        />
                    </div>
                    <div className='grow-0'>
                        <select
                            value={dataTimestampConfig.unit}
                            onChange={(e) => {
                                dataTimestampConfig.setUnit(e.target.value);
                            }}
                            className='form-select rounded bg-background text-foreground'
                        >
                            <option value=''>
                                --Please choose time unit--
                            </option>

                            <option value='d'>Day</option>
                            <option value='h'>Hour</option>
                            <option value='m'>Minute</option>
                            <option value='s'>Second</option>
                        </select>
                    </div>
                </div>

                {/* Data List */}
                <div className='flex flex-row flex-nowrap'>
                    <DatasetConfigList opt={dataRaw} />
                    {ldpOptions.map((opt, optIdx) => {
                        return <DatasetConfigList opt={opt} optIdx={optIdx} />;
                    })}
                </div>

                <div className='flex flex-row flex-nowrap'>
                    <DataList
                        datalist={dataRaw}
                        idx={"raw"}
                        dataTimestampConfig={dataTimestampConfig}
                    />

                    {dataPerturbed.map((dataPerturbedResult, idx) => {
                        return (
                            <DataList
                                datalist={dataPerturbedResult["resultFilled"]}
                                idx={idx}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default DataListView;
