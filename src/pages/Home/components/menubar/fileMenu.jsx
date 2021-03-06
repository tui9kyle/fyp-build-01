import LoadDemoData from '../fileInput/demoData';


const FileMenu = ({ setUiOverlayDir }) => {
    const callUiFileTxt = () => {
        setUiOverlayDir("FileTxt");
    };
    const callUiFileDemoData = () => {
        setUiOverlayDir("FileDemoData");
    };
    return (
        <>
            <div className='w-0'>
                <div className='relative bg-slate-800 w-fit'>
                    <ul className='flex flex-col w-max'>
                        <li>
                            <div
                                className='flex hover:text-white px-4 hover:bg-white hover:bg-opacity-30 h-8  items-stretch'
                                onClick={callUiFileTxt}
                            >
                                <a className='text-gray-300 text-m font-medium self-center'>
                                    Open File (plaintext)
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className='flex hover:text-white px-4 hover:bg-white hover:bg-opacity-30 h-8  items-stretch'
                             onClick={callUiFileDemoData}>
                                <a className='text-gray-300 text-m font-medium self-center'>
                                   Load Demo Dataset
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};


export default FileMenu;