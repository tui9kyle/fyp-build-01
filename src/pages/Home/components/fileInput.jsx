const FileInput = ({ setDataRaw, uiController, setDataFileMeta }) => {
    async function getFile(e) {
        const file = e.target.files[0];
        console.log(file.name);
    
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            var r = reader.result;
            var arr = r.split("\n");
            try {
                var arr2 = arr.map((v) => parseFloat(v));

                setDataRaw(arr2);
            } catch {
                setDataRaw(arr);
            }
        };
        uiController(false);
    }

    const hideUi = () => {
        uiController(false);
    };


    return (
        <>
            <div
                className='fixed z-10 inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-[1px]'
                aria-hidden='true'
            ></div>

            <div className='fixed z-20 inset-0 flex justify-center p-8'>
                <div className='relative h-fit w-fit px-8 py-3 bg-slate-50 rounded shadow-md flex flex-col'>
                
                <div className="mt-2">
                    <h1 className="text-4xl font-bold">Open File</h1>
                    <h2 className="font-mono text-lg text-gray-600">plaintext</h2>
                </div>
                <div className="my-2">
                <input
                        type='file'
                        onChange={getFile}
                        className='block text-gray-400 font-mono file:bg-gray-900 file:text-gray-100 w-full file:mr-4 file:py-2 file:px-5 file:rounded-full hover:file:bg-gray-600 hover:file:border-gray-400 file:border-gray-800 file:border-2'
                    ></input>
                
                </div>
                <div className="flex self-end mb-2">
                   <button className="border-2 border-gray-800 mr-2 py-2 px-5 rounded-full hover:bg-gray-600 hover:border-gray-400 hover:text-white" onClick={hideUi}>Cancel</button>
                </div>
                
                </div>
            </div>
        </>
    );
};

export default FileInput;
