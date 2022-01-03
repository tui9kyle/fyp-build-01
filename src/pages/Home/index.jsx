import { useState, useEffect, useRef } from "react";

import FileInput from "./components/fileInput";
import DataList from "./components/dataList";
import LdpOptions from "./components/ldpOptions";
import DataChart from "./components/dataChart";
import DargDiv from "./components/dragDiv";

const Home = () => {
    const [ldpOptions, setLdpOptions] = useState([]);
    const [dataRaw, setDataRaw] = useState();
    const [dataPerturbed, setDataPerturbed] = useState([]);
    const isLoaded = useRef(true);
    return (
        <div className='app'>
            <div className='flex flex-row '>
                <h1 className='font-sans text-2xl basis-2/3'>
                    Local Differential Privacy in the Temporal Setting
                </h1>

                <div className='basis-1/3'>
                    {" "}
                    <FileInput setDataRaw={setDataRaw} />
                </div>
            </div>

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
            <DataList
                data={{
                    dataRaw: dataRaw,
                    dataPerturbed: dataPerturbed,
                }}
                ldpOptions={ldpOptions}
            />
        </div>
    );
};

export default Home;
