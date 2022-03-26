import { useState } from "react";

const FileMenu = () => {
    return (
        <>
            <div className=' w-0  '>
                <div className='relative bg-slate-800 w-fit'>
                    <ul className='flex flex-col w-max'>
                        <li>
                            <div className='flex hover:text-white px-4 hover:bg-white hover:bg-opacity-30 h-8  items-stretch'>
                                <a className='text-gray-300  text-m font-medium self-center'>
                                    Open File (plaintext)
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className='flex hover:text-white px-4 hover:bg-white hover:bg-opacity-30 h-8  items-stretch'>
                                <a className='text-gray-300  text-m font-medium self-center'>
                                    Open File (csv)
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

const MenuBar = ({}) => {
    const [showFileMenu, setShowFileMenu] = useState(false);
    const callFileMenu = () => {
        setShowFileMenu(!showFileMenu);
    };

    const hideFileMenu = () => {
        setTimeout(function () {
            setShowFileMenu(false);
        }, 500);
    };

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
                                <a className='text-gray-300  text-m font-medium self-center'>
                                    File
                                </a>
                            </div>
                            {showFileMenu ? <FileMenu /> : null}
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