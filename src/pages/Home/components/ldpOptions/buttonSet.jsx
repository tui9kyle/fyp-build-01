const ButtonSet = ({ onClick }) => {
    return (
        <div className='flex flex-row items-center'>
            <button
                onClick={onClick}
                className='font-mono  text-gray-100 block bg-gray-900 my-5 mr-4 py-2 px-5 rounded-full border-0 hover:bg-gray-600'
            >
                Set
            </button>
        </div>
    );
};

export default ButtonSet;
