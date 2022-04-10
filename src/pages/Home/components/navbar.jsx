import { useState, useEffect } from "react";

const NavBarItem = ({ name, uiPath, waitData }) => {
    return (
        <>
            {name == uiPath.path ? (
                <li>
                    <div className='flex hover:text-slate-700 underline decoration-solid mr-6 h-8 items-stretch text-gray-900 cursor-pointer'>
                        <a className='text-2xl self-center'>{name}</a>
                    </div>
                </li>
            ) : (
                <li>
                    <div
                        className='flex hover:underline hover:decoration-solid mr-6 h-8 items-stretch text-gray-500 cursor-pointer'
                        onClick={() => {
                            if (!waitData) uiPath.setPath(name);
                        }}
                    >
                        <a className='text-2xl self-center'>{name}</a>
                    </div>
                </li>
            )}
        </>
    );
};

const NavBar = ({ navData, waitData }) => {
    const uiPath = { path: navData.uiDir, setPath: navData.setUiDir };

    return (
        <>
            <div className='flex flex-row mt-4 ml-6'>
                <ul className='flex flex-row w-max'>
                    <NavBarItem
                        name={"Data"}
                        uiPath={uiPath}
                        waitData={waitData}
                    />
                    <NavBarItem
                        name={"Perturbation"}
                        uiPath={uiPath}
                        waitData={waitData}
                    />
                    <NavBarItem
                        name={"Chart"}
                        uiPath={uiPath}
                        waitData={waitData}
                    />
                    <NavBarItem
                        name={"Statistics"}
                        uiPath={uiPath}
                        waitData={waitData}
                    />
                </ul>
            </div>
        </>
    );
};

export default NavBar;
