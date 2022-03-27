import { useState, useEffect, useRef } from "react";

import FileInput from "./components/fileInput";

import LdpOptions from "./components/ldpOptions";
import DataChart from "./components/dataChart";
import DargDiv from "./components/dragDiv";
import DatasetConfigList from "./components/datasetConfigList";
import MenuBar from "./components/menubar";
import NavBar from "./components/navbar";
import DataListView from "../DataList/dataList"


const AppHome = () => {
    const [ldpOptions, setLdpOptions] = useState([]);
    const [dataFileMeta, setDataFileMeta] = useState({
        format: "",
        filename: "",
    });
    const [dataRaw, setDataRaw] = useState();
    const [dataPerturbed, setDataPerturbed] = useState([]);
    const isLoaded = useRef(true);

    const ldpOptionsMaps = [];

    // ui
    const [uiDir, setUiDir] = useState("Home");
    const [uiFileTxt, setUiFileTxt] = useState(false);

    return (
        <>
            <MenuBar setUiFileTxt={setUiFileTxt} />
            {uiFileTxt ? (
                <FileInput
                    setDataRaw={setDataRaw}
                    uiController={setUiFileTxt}
                />
            ) : null}
            <NavBar navData={{ uiDir: uiDir, setUiDir: setUiDir }} />

            {uiDir == "Data" ? (
                <DataListView dataRaw={dataRaw} dataPerturbed={dataPerturbed} DatasetConfigList={DatasetConfigList} ldpOptions={ldpOptions}/>
            ) : null}

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

                <DataChart
                    data={{ dataRaw: dataRaw, dataPerturbed: dataPerturbed }}
                />

                {/* <DatasetConfigList optionList={ldpOptions} /> */}

            </div>
        </>
    );
};

export default AppHome;
