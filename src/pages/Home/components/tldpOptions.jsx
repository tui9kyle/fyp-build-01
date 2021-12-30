import { useState, useEffect, useRef } from "react";
import { Tldp } from "../../../library/tldp";
import ButtonSet from "./tldpOptions/buttonSet";
import InputNumber from "./tldpOptions/inputNumber";
import SelectMechanism from "./tldpOptions/selectMechanism";

const TldpOptions = ({ setTldpOptions, setDataPerturbed, dataRaw }) => {
    const [mechanism, setMechanism] = useState("");
    const [epsilon, setEpsilon] = useState();
    const [k, setK] = useState();
    const [c0, setC0] = useState();
    useEffect(() => {}, [mechanism]);

    function ldpCompute() {
        var result;

        if (mechanism == "BPM") {
            result = Tldp.BackwardPerturbationMechanism(dataRaw, k, epsilon);
        } else if (mechanism == "FPM") {
            result = Tldp.ForwardPerturbationMechanism(dataRaw, k, epsilon);
        }
        setTldpOptions({ k, epsilon, mechanism: mechanism });
        setDataPerturbed(result);
    }

    if (mechanism == "BPM" || mechanism == "FPM") {
        return (
            <div className='row'>
                <h4 className='font-sans'>TLDP Options</h4>
                <SelectMechanism
                    mechanism={mechanism}
                    setMechanism={setMechanism}
                />
                <InputNumber
                    labelName='&epsilon;'
                    value={epsilon}
                    setValue={setEpsilon}
                    inputMin='0'
                    inputStep='0.01'
                />
                <InputNumber
                    labelName='k'
                    value={k}
                    setValue={setK}
                    inputMin='1'
                    inputStep='1'
                />
                <ButtonSet onClick={ldpCompute} />
            </div>
        );
    } else if (mechanism == "TM") {
        return (
            <div className='row'>
                <h4 className='font-sans'>TLDP Options</h4>
                <SelectMechanism
                    mechanism={mechanism}
                    setMechanism={setMechanism}
                />

                <InputNumber
                    labelName='c0'
                    value={c0}
                    setValue={setC0}
                    inputMin='1'
                    inputStep='1'
                />
                <InputNumber
                    labelName='k'
                    value={k}
                    setValue={setK}
                    inputMin='1'
                    inputStep='1'
                />
                <ButtonSet onClick={ldpCompute} />
            </div>
        );
    } else {
        return (
            <div className='row'>
                <h4 className='font-sans'>TLDP Options</h4>
                <SelectMechanism
                    mechanism={mechanism}
                    setMechanism={setMechanism}
                />
            </div>
        );
    }
};

export default TldpOptions;
