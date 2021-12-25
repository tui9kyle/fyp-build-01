import { useState, useEffect } from "react";




import FileInput from "./components/fileInput";
import DataList from "./components/dataList";
import TldpOptions from "./components/tldpOptions";
import DataChart from "./components/dataChart";






const Home = () => {
    const [tldp, setTldp] = useState();
    const [k, setK] = useState();
    const [epsilon, setEpsilon] = useState();
    const [mechanism, setMechanism] = useState();




    return (
        <div className="app">
            <h1 className="font-sans text-2xl">
                Local Differential Privacy in the Temporal Setting
            </h1>

            <FileInput setTldp={setTldp} />
            <TldpOptions tldp={tldp} setK={setK} setEpsilon={setEpsilon} setMechanism={setMechanism} />
            <DataChart tldp={tldp} k={k} epsilon={epsilon} />
            <DataList tldp={tldp} k={k} epsilon={epsilon} mechanism={mechanism} />
        </div>
    );
};

export default Home;
