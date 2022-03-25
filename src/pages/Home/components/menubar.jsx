const MenuBar = ({}) => {
    return (
        <>
            <nav class='bg-gray-800'>
                <div class='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
                    <div class='relative flex items-center   h-8'>
                        <div class='flex justify-start flex-auto'>
                            <a class='text-gray-300 hover:text-white px-3 text-sm font-medium '>
                                Test1
                            </a>
                        </div>
                        <div class='flex justify-end flex-auto'>
                            <a class='text-gray-400  px-3 text-sm font-medium '>
                                Local Differential Privacy in the Temporal
                                Setting
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default MenuBar;
