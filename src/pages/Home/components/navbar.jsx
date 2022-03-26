import { useState } from "react";

const NavBarItem = ({ name, idx }) => {
    return (
        <>
            <li>
                <div className='flex hover:text-red-800 px-4 hover:bg-black hover:bg-opacity-30 h-8  items-stretch text-gray-800 '>
                    <a className='text-m font-medium self-center'>
                        {name}
                    </a>
                </div>
            </li>
        </>
    );
};

const NavBar = ({navData}) => {
    return (
        <>
            <div className='flex flex-row '>
                <ul className='flex flex-row w-max'>
                    <NavBarItem name={"Datafile"} />
                    <NavBarItem name={"Perturbation"} />
                    <NavBarItem name={"Chart"} />
                    <NavBarItem name={"Stat"} />
                </ul>
            </div>
        </>
    );
};

export default NavBar;
