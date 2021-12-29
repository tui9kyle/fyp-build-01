import { useState, useEffect } from "react";

import FileInput from "./components/fileInput";
import DataList from "./components/dataList";
import TldpOptions from "./components/tldpOptions";
import DpOptions from "./components/dpOptions";
import DataChart from "./components/dataChart";

const Home = () => {
    const [tldpOptions, setTldpOptions] = useState();
    const [dpOptions, setDpOptions] = useState();
    const [dataRaw, setDataRaw] = useState();
    const [dataPerturbed, setDataPerturbed] = useState();
    const [dataPerturbedDp, setDataPerturbedDp] = useState();
    return (
        <div className='app'>
            <h1 className='font-sans text-2xl'>
                Local Differential Privacy in the Temporal Setting
            </h1>

            <FileInput setDataRaw={setDataRaw} />
            <div className='flex flex-row'>
                <div className='basis-1/2'>
                    <TldpOptions
                        setTldpOptions={setTldpOptions}
                        setDataPerturbed={setDataPerturbed}
                        dataRaw={dataRaw}
                    />
                </div>
                <div className='basis-1/2'>
                    <DpOptions
                        setDpOptions={setDpOptions}
                        setDataPerturbedDp={setDataPerturbedDp}
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
                tldpOptions={tldpOptions}
            />
        </div>
    );
};

export default Home;
