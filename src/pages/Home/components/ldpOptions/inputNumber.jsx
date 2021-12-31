const InputNumber = ({ labelName, value, setValue, inputMin, inputStep }) => {
    return (
        <div className='flex flex-row items-center'>
            <div className='basis-1/5 pr-2'>
                <label className='font-mono'> {labelName} </label>
            </div>

            <div className='flex-auto'>
                <input
                    className='form-input rounded bg-background text-foreground'
                    type='number'
                    min={inputMin}
                    step={inputStep}
                    value={value}
               onChange={(e) => {setValue(e.target.value)}}
               
               />
            </div>
        </div>
    );
};

export default InputNumber;
