import DataList from "./components/dataList";

const DataListView = ({
    dataRaw,
    dataPerturbed,
    DatasetConfigList,
    ldpOptions,
}) => {
    return (
        <>
            <div className='app'>
                <div className='flex flex-row flex-nowrap'>
                    <DatasetConfigList opt={dataRaw} />
                    {ldpOptions.map((opt, optIdx) => {
                        return <DatasetConfigList opt={opt} optIdx={optIdx} />;
                    })}
                </div>
                <div className='flex flex-row flex-nowrap'>
                    <DataList datalist={dataRaw} idx={"raw"} />

                    {dataPerturbed.map((dataPerturbedResult, idx) => {
                        return (
                            <DataList
                                datalist={dataPerturbedResult["resultFilled"]}
                                idx={idx}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default DataListView;
