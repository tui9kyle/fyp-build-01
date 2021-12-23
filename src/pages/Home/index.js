import { useState, useEffect } from 'react'

import FileInput from './components/fileInput'
import DataList from './components/dataList';


import '../../styles/main.css';



const Home = () => {







    const [tldp, setTldp] = useState();




    // useEffect(() => {
    //     console.log(tldp)
    // }, [tldp])




    useEffect(() => {



    }, [tldp])



    

    return <div className="app">


<h1 className="font-sans">
Local Differential Privacy in the Temporal Setting
</h1>


        <FileInput setTldp={setTldp} />



        <DataList tldp={tldp} />




    </div>

}

export default Home;