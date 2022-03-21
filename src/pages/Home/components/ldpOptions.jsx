import { useState, useEffect, useRef } from "react";
import { Tldp } from "../../../library/tldp";
import { Vldp } from "../../../library/vldp";
import ButtonSet from "./ldpOptions/buttonSet";
import InputNumber from "./ldpOptions/inputNumber";
import SelectMechanism from "./ldpOptions/selectMechanism";

const LdpOptions = ({
    setLdpOptions,
    setDataPerturbed,
    dataRaw,
    ldpOptions,
}) => {
    const [mechanism, setMechanism] = useState("");
    const [epsilon, setEpsilon] = useState();
    const [k, setK] = useState();
    const [c0, setC0] = useState();
    const [sensitivity, setSensitivity] = useState();
    useEffect(() => {}, [mechanism]);

    function ldpCompute() {
        // maximum load 5
        if (ldpOptions.length >= 5) return;

        let result;

        switch (mechanism) {
            case "BPM":
                result = Tldp.BackwardPerturbationMechanism(
                    dataRaw,
                    k,
                    epsilon
                );
                setLdpOptions((arr) => [...arr, { k, epsilon, mechanism }]);
                break;

            case "FPM":
                result = Tldp.ForwardPerturbationMechanism(dataRaw, k, epsilon);
                setLdpOptions((arr) => [...arr, { k, epsilon, mechanism }]);
                break;

            case "ETM":
                result = Tldp.ExtendedThresholdMechanism(dataRaw, k, epsilon);
                setLdpOptions((arr) => [...arr, { k, epsilon, mechanism }]);
                break;

            case "TM":
                result = Tldp.ThresholdMechanism(dataRaw, k, c0);
                setLdpOptions((arr) => [...arr, { k, c0, mechanism }]);
                break;

            case "LM":
                result = Vldp.LaplaceMechanism(dataRaw, sensitivity, epsilon);
                setLdpOptions((arr) => [
                    ...arr,
                    { sensitivity, epsilon, mechanism },
                ]);
                break;
        }

        setDataPerturbed((arr) => [...arr, result]);
    }

    if (mechanism == "BPM" || mechanism == "FPM" || mechanism == "ETM") {
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
    } else if (mechanism == "TM") {
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
    } else if (mechanism == "LM") {
        return (
            <div className='row'>
                <h4 className='font-sans'>LDP Mechanism Options</h4>
                <SelectMechanism
                    mechanism={mechanism}
                    setMechanism={setMechanism}
                />
                <InputNumber
                    labelName='Sensitivity'
                    value={sensitivity}
                    setValue={setSensitivity}
                    inputMin='0'
                    inputStep='0.01'
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
