import { useState, useEffect, useRef } from "react";

import FileInput from "./components/fileInput";
import DataList from "./components/dataList";
import LdpOptions from "./components/ldpOptions";
import DataChart from "./components/dataChart";
import DargDiv from "./components/dragDiv";
import DatasetConfigList from "./components/datasetConfigList";
import MenuBar from "./components/menubar";
import NavBar from "./components/navbar";

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
    const [uiDir, setUiDir] = useState("home");
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

            <div className='app'>
                <NavBar navData={{ uiDir: uiDir, setUiDir: setUiDir }} />
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

                <div className='flex flex-row flex-nowrap'>
                    <DatasetConfigList opt={dataRaw} />
                    {ldpOptions.map((opt, optIdx) => {
                        return <DatasetConfigList opt={opt} optIdx={optIdx} />;
                    })}
                </div>

                <div className='flex flex-row flex-nowrap'>
                    <DataList datalist={dataRaw} idx={"raw"} />

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

export default AppHome;
