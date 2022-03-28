import { useState, useEffect, useRef } from "react";

import FileInput from "./components/fileInput/fileInput";

import LdpOptions from "./components/ldpOptions";
import DataChart from "./components/dataChart";
import DargDiv from "./components/dragDiv";
import DatasetConfigList from "./components/datasetConfigList";
import MenuBar from "./components/menubar";
import NavBar from "./components/navbar";
import DataListView from "../DataList/dataListView";
import AnalysisView from "../Analysis/analysisView";

const AppHome = () => {
    // data file
    const [dataFileMeta, setDataFileMeta] = useState({
        format: "",
        filename: "",
    });
    // timestamp config
    const [dataTimeInterval, setDataTimeInterval] = useState();
    const [dataTimeUnit, setDataTimeUnit] = useState();
    const [dataTimestampStart, setDataTimestampStart] = useState();

    // data
    const [dataRaw, setDataRaw] = useState();
    const [dataPerturbed, setDataPerturbed] = useState([]);

    const [ldpOptions, setLdpOptions] = useState([]);
    const ldpOptionsMaps = [];

    // ui

    const [uiDir, setUiDir] = useState("Home");
    const [uiFileTxt, setUiFileTxt] = useState(false);

    return (
        <>
            <MenuBar
                setUiFileTxt={setUiFileTxt}
                dataFileName={dataFileMeta.filename}
            />

            <NavBar navData={{ uiDir: uiDir, setUiDir: setUiDir }} />

            {uiDir == "Data" ? (
                <DataListView
                    dataRaw={dataRaw}
                    dataPerturbed={dataPerturbed}
                    dataFileMeta={dataFileMeta}
                    DatasetConfigList={DatasetConfigList}
                    ldpOptions={ldpOptions}
                    dataTimestampConfig={{
                        interval: dataTimeInterval,
                        setInterval: setDataTimeInterval,
                        start: dataTimestampStart,
                        setStart: setDataTimestampStart,
                        unit: dataTimeUnit,
                        setUnit: setDataTimeUnit,
                    }}
                />
            ) : null}

            {uiFileTxt ? (
                <FileInput
                    setDataRaw={setDataRaw}
                    uiController={setUiFileTxt}
                    setDataFileMeta={setDataFileMeta}
                />
            ) : null}

            {uiDir == "Perturbation" ? (
                <div className='app'>
                    {/* <DargDiv /> */}

                    <div className='flex flex-row '>
                        <div className='basis-1/2'>
                            <LdpOptions
                                ldpOptions={ldpOptions}
                                setLdpOptions={setLdpOptions}
                                setDataPerturbed={setDataPerturbed}
                                dataRaw={dataRaw}
                            />
                        </div>
                    </div>

                    <div className='flex flex-row flex-nowrap'>
                        <DatasetConfigList opt={dataRaw} />
                        {ldpOptions.map((opt, optIdx) => {
                            return (
                                <DatasetConfigList opt={opt} optIdx={optIdx} />
                            );
                        })}
                    </div>

                    {/* <DatasetConfigList optionList={ldpOptions} /> */}
                </div>
            ) : null}

            {uiDir == "Chart" ? (
                <div className='app'>
                    <DataChart
                        data={{
                            dataRaw: dataRaw,
                            dataPerturbed: dataPerturbed,
                        }}
                    />
                    <div className='flex flex-row flex-nowrap'>
                        <DatasetConfigList opt={dataRaw} />
                        {ldpOptions.map((opt, optIdx) => {
                            return (
                                <DatasetConfigList opt={opt} optIdx={optIdx} />
                            );
                        })}
                    </div>

                    {/* <DatasetConfigList optionList={ldpOptions} /> */}
                </div>
            ) : null}

            {uiDir == "Analysis" ? (
                <AnalysisView
                    dataRaw={dataRaw}
                    dataPerturbed={dataPerturbed}
                    dataFileMeta={dataFileMeta}
                    DatasetConfigList={DatasetConfigList}
                    ldpOptions={ldpOptions}
                    dataTimestampConfig={{
                        interval: dataTimeInterval,
                        setInterval: setDataTimeInterval,
                        start: dataTimestampStart,
                        setStart: setDataTimestampStart,
                        unit: dataTimeUnit,
                        setUnit: dataTimeUnit,
                    }}
                />
            ) : null}
        </>
    );
};

export default AppHome;
