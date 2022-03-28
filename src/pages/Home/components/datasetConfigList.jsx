import { CustomColor, CustomColors } from "./ldpOptions/customColor";

const DatasetConfigList = ({ opt, optIdx }) => {
    if (opt == null) return <></>;
    else if (optIdx == null) {
        return (
            <div
                className='basis-1/4  text-sm p-2 border-8 border-white  rounded-2xl relative'
                style={{
                    backgroundColor: CustomColor.dull,
                    textShadow: `0 0 5rem ${CustomColor.dull}`,
                }}
            >
                <br />
                <br />
                <br />
                <p className='text-xl text-white text-right font-bold absolute bottom-2 right-0 pr-3 opacity-30'>
                    Original Data
                </p>
            </div>
        );
    } else {
        const idxList = [];
        const valList = [];

        new Map(Object.entries(opt)).forEach((e, idx) => {
            idxList.push(idx);
            valList.push(e);
        });

        return (
            <div
                className='basis-1/6 text-sm p-2 border-8 border-white  rounded-2xl relative'
                style={{
                    backgroundColor: CustomColors[optIdx],
                    textShadow: `0 0 5rem ${CustomColors[optIdx]}`,
                }}
            >
                {idxList.map((v, idx) => {
                    return (
                        <div className='px-5' style={{}}>
                            <span className='text-white font-bold'>{v}: </span>
                            <span className='font-mono text-white'>
                                {" "}
                                {valList[idx]}{" "}
                            </span>
                            <br />
                        </div>
                    );
                })}
                <br />

                <p className='text-xl text-white text-center font-bold absolute bottom-2  right-0 pr-3 opacity-30'>
                    Perturbed Data {optIdx + 1}
                </p>
            </div>
        );
    }
};

export default DatasetConfigList;
