import { useState } from "react";



const AnalysisView = ({
    dataRaw,
    dataPerturbed,
    dataFileMeta,
    DatasetConfigList,
    ldpOptions,
    dataTimestampConfig
}) => {

    return (
        <>
            <div className='app'>
                {/* Data Meta */}
                <div>

                    <div className='flex flex-row flex-nowrap'>
                        <div>
                            File: <span className="font-mono">{dataFileMeta.filename}</span>
                        </div>
                    </div>

                    <div className='flex flex-row flex-nowrap'>
                        <div>
                            Format: <span className="font-mono">{dataFileMeta.format}</span>
                        </div>
                    </div>
                    <div className='flex flex-row flex-nowrap'>
                        <div>
                            Interval: <span className="font-mono">{dataTimestampConfig.interval}</span> <span className="font-sans">{dataTimestampConfig.unit}</span>
                        </div>
                    </div>
                </div>



                {/* Grouping Config */}
                {/* 
                <div className='flex flex-row items-center'>
                    <div className='basis-1/7 pr-2'>
                        <label className='font-sans'>Grouping</label>
                    </div>

                    <div className='grow-0 px-2'>
                        <input
                            className='form-input rounded bg-background text-foreground'
                            type='number'


                            value={dataTimestampConfig.interval}
                            onChange={(e) => {
                                dataTimestampConfig.setInterval(parseFloat(e.target.value));
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
                            <option value=''>--Please choose time unit--</option>

                            <option value='d'>Day</option>
                            <option value='h'>Hour</option>
                            <option value='m'>Minute</option>
                            <option value='s'>Second</option>
                        </select>
                    </div>
                </div> */}


                {/* Results */}


                <div>

                    <h1 className="text-3xl mt-3">Sum</h1>




                </div>




                <div>

                    <h1 className="text-3xl mt-3">Average</h1>


                </div>


                <div>

                    <h1 className="text-3xl mt-3">Average</h1>


                </div>

            </div>
        </>
    );
};

export default AnalysisView;
