import { useState, useEffect } from 'react'
import { TLDP } from '../../../library/tldp'


import '../../../styles/main.css';





const FileInput = ({ setTldp }) => {




    async function getFile(e) {


        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            var r = reader.result;
            var arr = r.split("\n");
            setTldp(new TLDP(arr));
        }
    }

    return <>

        <input type="file" onChange={getFile} ></input>


    </>

}

export default FileInput;