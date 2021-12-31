const SelectMechanism = ({ mechanism, setMechanism }) => {
    return (
        <div className='flex flex-row items-center'>
            <div className='basis-1/5 pr-2'>
                <label>Mechanism</label>
            </div>

            <div className=''>
                <select
                    value={mechanism}
                    onChange={(e)=>{setMechanism(e.target.value)}}
                    className='form-select rounded bg-background text-foreground'
                >
                    <option value=''>--Please choose an option--</option>
                    <option value='t_BPM'>Backward Perturbation Mechanism</option>
                    <option value='t_FPM'>Forward Perturbation Mechanism</option>

                    <option value='t_TM'>Threshold Mechanism</option>
                    <option value='v_LM'>Laplace Mechanism</option>
                </select>
            </div>
        </div>
    );
};

export default SelectMechanism;
