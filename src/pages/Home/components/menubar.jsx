import { useState } from "react";

import FileMenu from "./menubar/fileMenu";
import AboutMenu from "./menubar/aboutMenu";

const MenuBar = ({ setUiFileTxt }) => {
    const [uiFileMenu, setUiFileMenu] = useState(false);
    const [uiAboutMenu, setUiAboutMenu] = useState(false);
    const callFileMenu = () => setUiFileMenu(!uiFileMenu);

    const hideFileMenu = () =>
        setTimeout(() => {
            setUiFileMenu(false);
        }, 500);

    const callAboutMenu = () => setUiAboutMenu(!uiAboutMenu);

    const hideAboutMenu = () =>
        setTimeout(() => {
            setUiAboutMenu(false);
        }, 500);

    return (
        <>
            <nav className='bg-slate-700'>
                <div className='relative flex w-full h-8 items-stretch'>
                    <div className='flex justify-start flex-auto items-stretch '>
                        <div onMouseLeave={hideFileMenu}>
                            <div
                                className='flex hover:text-white px-4 hover:bg-white hover:bg-opacity-30 h-8  items-stretch'
                                onClick={callFileMenu}
                            >
                                <a className='text-gray-300 text-m font-medium self-center'>
                                    File
                                </a>
                            </div>
                            {uiFileMenu ? (
                                <FileMenu setUiFileTxt={setUiFileTxt} />
                            ) : null}
                        </div>
                        <div onMouseLeave={hideAboutMenu}>
                            <div
                                className='flex hover:text-white px-4 hover:bg-white hover:bg-opacity-30 h-8  items-stretch'
                                onClick={callAboutMenu}
                            >
                                <a className='text-gray-300  text-m font-medium self-center'>
                                    About
                                </a>
                            </div>
                            {uiAboutMenu ? <AboutMenu /> : null}
                        </div>
                    </div>
                    <div className='flex justify-end flex-auto items-stretch'>
                        <a className='text-gray-400  px-3 text-sm font-medium self-center'>
                            Local Differential Privacy in the Temporal Setting
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default MenuBar;
