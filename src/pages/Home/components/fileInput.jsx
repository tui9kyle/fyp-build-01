const FileInput = ({ setDataRaw, uiController }) => {
    async function getFile(e) {
        const file = e.target.files[0];
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

    return (
        <>
            <div
                className='fixed z-10 inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-[1px]'
                aria-hidden='true'
            ></div>

            <div className='fixed z-20 inset-0 flex justify-center p-8'>
                <div className='relative h-fit w-fit px-10 py-3 bg-slate-50 rounded shadow-md flex'>
                    <input
                        type='file'
                        onChange={getFile}
                        className='block text-gray-400 font-mono              file:bg-gray-900 file:text-gray-100  w-full         file:mr-4 file:py-2 file:px-5 file:rounded-full file:border-0 hover:file:bg-gray-600'
                    ></input>
                </div>
            </div>
        </>
    );
};

export default FileInput;
