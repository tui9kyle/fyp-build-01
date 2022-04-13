const AboutMenu = ({ setUiOverlayDir }) => {
    const callUiAbout= () => {
        setUiOverlayDir("About");
    };
    return (
        <>
            <div className='w-0'>
                <div className='relative bg-slate-800 w-fit'>
                    <ul className='flex flex-col w-max'>
                        <li>
                            <div
                                className='flex hover:text-white px-4 hover:bg-white hover:bg-opacity-30 h-8  items-stretch'
                                onClick={callUiAbout}
                            >
                                <a className='text-gray-300  text-m font-medium self-center'>
                                    About This Project
                                </a>
                            </div>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AboutMenu;
