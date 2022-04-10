import { useState, useEffect, useRef } from "react";

import FileInput from "./components/fileInput/fileInput";
import LoadDemoData from "./components/fileInput/demoData";

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


    // data
    const [dataRaw, setDataRaw] = useState();
    const [dataPerturbed, setDataPerturbed] = useState([]);

    const [ldpOptions, setLdpOptions] = useState([]);
    const ldpOptionsMaps = [];

    // ui

    const [uiDir, setUiDir] = useState("Data");
    const [uiOverlayDir, setUiOverlayDir] = useState("");
    return (
        <>
            <MenuBar
                setUiOverlayDir={setUiOverlayDir}
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
                   
                />
            ) : null}

            {uiOverlayDir == "FileTxt" ? (
                <FileInput
                    setDataRaw={setDataRaw}
                    uiController={setUiOverlayDir}
                    setDataFileMeta={setDataFileMeta}
                />
            ) : null}

            {uiOverlayDir == "FileDemoData" ? (
                <LoadDemoData
                    setDataRaw={setDataRaw}
                    uiController={setUiOverlayDir}
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

            {uiDir == "Statistics" ? (
                <AnalysisView
                    dataRaw={dataRaw}
                    dataPerturbed={dataPerturbed}
                    dataFileMeta={dataFileMeta}
                    DatasetConfigList={DatasetConfigList}
                    ldpOptions={ldpOptions}
               
                />
            ) : null}
        </>
    );
};

export default AppHome;
