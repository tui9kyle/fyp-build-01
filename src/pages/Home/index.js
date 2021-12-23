import { useState, useEffect } from "react";


import "../../styles/main.css";

import FileInput from "./components/fileInput";
import DataList from "./components/dataList";
import TldpOptions from "./components/tldpOptions";






const Home = () => {
    const [tldp, setTldp] = useState();

    useEffect(() => { }, [tldp]);

    return (
        <div className="app">
            <h1 className="font-sans">
                Local Differential Privacy in the Temporal Setting
            </h1>

            <FileInput setTldp={setTldp} />
            <TldpOptions tldp={tldp} setTldp={setTldp} />
            <DataList tldp={tldp} />
        </div>
    );
};

export default Home;
