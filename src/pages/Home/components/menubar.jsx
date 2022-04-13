import { useState } from "react";

import FileMenu from "./menubar/fileMenu";
import AboutMenu from "./menubar/aboutMenu";

const MenuBar = ({ dataFileName ,setUiOverlayDir }) => {
    const [uiFileMenu, setUiFileMenu] = useState(false);
    const [uiAboutMenu, setUiAboutMenu] = useState(false);
    const callFileMenu = () => setUiFileMenu(!uiFileMenu);

    const hideFileMenu = () =>
        setTimeout(() => {
            setUiFileMenu(false);
        }, 300);

    const callAboutMenu = () => setUiAboutMenu(!uiAboutMenu);

    const hideAboutMenu = () =>
        setTimeout(() => {
            setUiAboutMenu(false);
        }, 300);

    return (
        <>
            <nav className='bg-slate-700'>
                <div className='relative flex w-full h-8 items-stretch'>
                    <div className='flex justify-start flex-none items-stretch '>
                        <div onMouseLeave={hideFileMenu}>
                            <div
                                className='flex hover:text-white px-4 hover:bg-white hover:bg-opacity-30 h-8  items-stretch hover:underline hover:decoration-solid'
                                onClick={callFileMenu}
                            >
                                <a className='text-gray-300 text-m font-medium self-center'>
                                    File
                                </a>
                            </div>
                            {uiFileMenu ? (
                                <FileMenu setUiOverlayDir={setUiOverlayDir} />
                            ) : null}
                        </div>
                        <div onMouseLeave={hideAboutMenu}>
                            <div
                                className='flex hover:text-white px-4 hover:bg-white hover:bg-opacity-30 h-8  items-stretch hover:underline hover:decoration-solid'
                                onClick={callAboutMenu}
                            >
                                <a className='text-gray-300  text-m font-medium self-center'>
                                    About
                                </a>
                            </div>
                            {uiAboutMenu ? <AboutMenu setUiOverlayDir={setUiOverlayDir} /> : null}
                        </div>
                    </div>
                    <div className='grow flex justify-center  items-stretch'>
                        <a className=' text-gray-400 font-mono px-3 text-sm  self-center'>
                           {(dataFileName == "" ? "Welcome" : dataFileName)}
                        </a>
                    </div>
                    <div className='flex justify-end flex-none items-stretch'>
                        <a className='text-gray-400 font-serif px-3 text-sm font-medium tracking-wide self-center'>
                            Local Differential Privacy in the Temporal Setting
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default MenuBar;
