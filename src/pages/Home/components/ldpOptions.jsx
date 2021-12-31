import { useState, useEffect, useRef } from "react";
import { Tldp } from "../../../library/tldp";
import { Vldp } from "../../../library/vldp";
import ButtonSet from "./ldpOptions/buttonSet";
import InputNumber from "./ldpOptions/inputNumber";
import SelectMechanism from "./ldpOptions/selectMechanism";

const LdpOptions = ({ setLdpOptions, setDataPerturbed, dataRaw }) => {
    const [mechanism, setMechanism] = useState("");
    const [epsilon, setEpsilon] = useState();
    const [k, setK] = useState();
    const [c0, setC0] = useState();
    useEffect(() => {}, [mechanism]);

    function ldpCompute() {
        var result;

        if (mechanism == "t_BPM") {
            result = Tldp.BackwardPerturbationMechanism(dataRaw, k, epsilon);
            setLdpOptions({ k, epsilon, mechanism });
        } else if (mechanism == "t_FPM") {
            result = Tldp.ForwardPerturbationMechanism(dataRaw, k, epsilon);
            setLdpOptions({ k, epsilon, mechanism });
        } else if (mechanism == "v_LM") {
            result = Vldp.LaplaceMechanism(dataRaw, epsilon);
            setLdpOptions({ epsilon, mechanism });
        }

        setDataPerturbed(result);
    }

    if (mechanism == "t_BPM" || mechanism == "t_FPM") {
        return (
            <div className='row'>
                <h4 className='font-sans'>LDP Mechanism Options</h4>
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
    } else if (mechanism == "t_TM") {
        return (
            <div className='row'>
                <h4 className='font-sans'>LDP Mechanism Options</h4>
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
    } else if (mechanism == "v_LM") {
        return (
            <div className='row'>
                <h4 className='font-sans'>LDP Mechanism Options</h4>
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
                <ButtonSet onClick={ldpCompute} />
            </div>
        );
    } else {
        return (
            <div className='row'>
                <h4 className='font-sans'>LDP Mechanism Options</h4>
                <SelectMechanism
                    mechanism={mechanism}
                    setMechanism={setMechanism}
                />
            </div>
        );
    }
};

export default LdpOptions;
