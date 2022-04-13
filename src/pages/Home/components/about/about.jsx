const About = ({ uiController }) => {

    const hideUi = () => {
        uiController("");
    };

    return (
        <>
            <div
                className='fixed z-10 inset-0 h-8 bg-black bg-opacity-50 '
                aria-hidden='true'
            ></div>
            <div
                className='fixed z-10 inset-0 mt-8 bg-black bg-opacity-50  backdrop-blur-[0.75px]'
                aria-hidden='true'
            ></div>

            <div className='fixed z-20 inset-0 flex justify-center p-8'>
                <div className='relative h-fit w-fit px-8 py-3 bg-slate-50 rounded shadow-md flex flex-col'>
                    <div className='mt-2'>
                        <h1 className='text-3xl font-bold'>About this Project</h1>

                    </div>
                    <div className='my-2 flex flex-col text-center p-4'>
                        <div className="">
                            <h2 className="text-xl font-bold">Differentially Private Time Series Data Release</h2>

                            <p className="font-bold">EIE4430 Honours Project</p>


                        </div>

                        <div>
                            <p>This application would perturb and show the data with Local Differential Privacy mechanisms</p>
                        </div>

                        <div className="my-4">
                            <h3 className="font-bold text-xl">Acknowledgment</h3>
                            <p>The demo dataset is an extract of Heart rate time series in MIT-BIH Database Distribution </p>
                        </div>

                    </div>
                    <div className='flex self-end mb-2'>
                        <button
                            className='border-2 border-gray-800 mr-2 py-2 px-5 rounded-full hover:bg-gray-600 hover:border-gray-400 hover:text-white'
                            onClick={hideUi}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
