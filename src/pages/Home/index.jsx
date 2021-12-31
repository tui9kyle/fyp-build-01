import { useState, useEffect } from "react";

import FileInput from "./components/fileInput";
import DataList from "./components/dataList";
import LdpOptions from "./components/ldpOptions";
import DataChart from "./components/dataChart";

const Home = () => {
    const [ldpOptions, setLdpOptions] = useState();
   
    const [dataRaw, setDataRaw] = useState();
    const [dataPerturbed, setDataPerturbed] = useState();
 
    return (
        <div className='app'>
            <h1 className='font-sans text-2xl'>
                Local Differential Privacy in the Temporal Setting
            </h1>

            <FileInput setDataRaw={setDataRaw} />
            <div className='flex flex-row'>
                <div className='basis-1/2'>
                    <LdpOptions
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
