import { useState, useEffect } from 'react'
import { Tldp } from '../../../library/tldp'







const FileInput = ({ setTldp }) => {




    async function getFile(e) {


        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            var r = reader.result;
            var arr = r.split("\n");
            setTldp(new Tldp(arr));
        }
    }

    return <>

        <input type="file" onChange={getFile}
            className="block text-gray-400 font-mono
             file:bg-gray-900 file:text-gray-100
         w-full 
         file:my-5 file:mr-4 file:py-2 file:px-5
         file:rounded-full file:border-0

       hover:file:bg-gray-600
        
  " ></input>


    </>

}

export default FileInput;