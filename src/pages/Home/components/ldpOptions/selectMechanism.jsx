const SelectMechanism = ({ mechanism, setMechanism }) => {
    return (
        <div className='flex flex-row items-center'>
            <div className='basis-1/5 pr-2'>
                <label>Mechanism</label>
            </div>

            <div className=''>
                <select
                    value={mechanism}
                    onChange={(e) => {
                        setMechanism(e.target.value);
                    }}
                    className='form-select rounded bg-background text-foreground'
                >
                    <option value=''>--Please choose an option--</option>
                    <option value='BPM'>Backward Perturbation Mechanism</option>
                    <option value='FPM'>Forward Perturbation Mechanism</option>

                    <option value='TM'>Threshold Mechanism</option>
                    <option value='LM'>Laplace Mechanism</option>
                </select>
            </div>
        </div>
    );
};

export default SelectMechanism;
