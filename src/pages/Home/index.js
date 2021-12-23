import { useState, useEffect } from "react";


import "../../styles/main.css";

import FileInput from "./components/fileInput";
import DataList from "./components/dataList";
import TldpOptions from "./components/tldpOptions";






const Home = () => {
    const [tldp, setTldp] = useState();
    const [k, setK] = useState();
    const [epsilon, setEpsilon] = useState();
    const [mechanism, setMechanism] = useState();


    return (
        <div className="app">
            <h1 className="font-sans">
                Local Differential Privacy in the Temporal Setting
            </h1>

            <FileInput setTldp={setTldp} />
            <TldpOptions tldp={tldp} setK={setK} setEpsilon={setEpsilon} setMechanism={setMechanism}/>
            <DataList tldp={tldp} k={k} epsilon={epsilon} mechanism={mechanism}/>
        </div>
    );
};

export default Home;
