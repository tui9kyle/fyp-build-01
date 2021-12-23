import { useState, useEffect } from 'react'
import '../../library/tldp';

import '../../styles/main.css';




var tldp;



const Home = () => {

    const [datafile, setDatafile] = useState();


    async function getFile(e) {


        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            var r = reader.result;

            var arr = r.split("\n");
            tldp = new TLDPData(arr);
            console.log(tldp)
        }
    }

    return <div className="app">
        <h1>Datafile</h1>



        <input type="file" onChange={getFile} ></input>
    </div>

}

export default Home;