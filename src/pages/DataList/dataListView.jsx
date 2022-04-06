import { useState } from "react";

import DataList from "./components/dataList";

const DataListView = ({
    dataRaw,
    dataPerturbed,
    dataFileMeta,
    DatasetConfigList,
    ldpOptions,
 
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
