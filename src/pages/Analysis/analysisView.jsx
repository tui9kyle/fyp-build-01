import { useState } from "react";
import * as ss from "simple-statistics";

const AnalysisView = ({
    dataRaw,
    dataPerturbed,
    dataFileMeta,
    dataTimestampConfig,
}) => {
    let results = [];
    results[0] = {
        dataset: "Original Data",
        max: ss.max(dataRaw),
        min: ss.min(dataRaw),
        avg: ss.average(dataRaw),
        sum: ss.sum(dataRaw),
        var: ss.variance(dataRaw),
    };
    for (let i = 1; i <= dataPerturbed.length; i++) {
        let d = dataPerturbed[i - 1].result;
        d = d.filter((e) => !isNaN(e));
        results[i] = {
            dataset: "Perturbed Data" + i,
            max: ss.max(d),
            min: ss.min(d),
            avg: ss.average(d),
            sum: ss.sum(d),
            var: ss.variance(d),
        };
    }

    return (
        <>
            <div className='app'>
                {/* Data Meta */}
                <div>
                    <div className='flex flex-row flex-nowrap'>
                        <div>
                            File:{" "}
                            <span className='font-mono'>
                                {dataFileMeta.filename}
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-row flex-nowrap'>
                        <div>
                            Format:{" "}
                            <span className='font-mono'>
                                {dataFileMeta.format}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className='font-mono'>
                    {results.map((ctx, idx) => {
                        if (ctx)
                            return (
                                <>
                                    <div>
                                        <h1 className='text-3xl mt-3 mb-2'>
                                            {ctx.dataset}
                                        </h1>
                                        <h2 className='font-bold'>Sum</h2>
                                        <p> {ctx.sum}</p>
                                    </div>
                                </>
                            );
                    })}

                    <div>
                        <h1 className='text-3xl mt-3 mb-2'>Average</h1>
                        <h2 className='font-bold'>Original Data</h2>
                        <p> {results[0].avg}</p>

                        {results[1] != null ? (
                            <>
                                <h2 className='font-bold'>Perturbed Data 1</h2>
                                <p>
                                    {" "}
                                    {results[1].avg} (
                                    {((results[1].avg - results[0].avg) /
                                        results[0].avg) *
                                        100}
                                    %)
                                </p>
                            </>
                        ) : null}

                        {results[2] != null ? (
                            <>
                                <h2 className='font-bold'>Perturbed Data 2</h2>
                                <p>
                                    {" "}
                                    {results[2].avg} (
                                    {((results[2].avg - results[0].avg) /
                                        results[0].avg) *
                                        100}
                                    %)
                                </p>
                            </>
                        ) : null}
                    </div>

                    <div>
                        <h1 className='text-3xl mt-3 mb-2'>Variance</h1>
                        <h2 className='font-bold'>Original Data</h2>
                        <p> {results[0].var}</p>

                        {results[1] != null ? (
                            <>
                                <h2 className='font-bold'>Perturbed Data 1</h2>
                                <p>
                                    {" "}
                                    {results[1].var} (
                                    {((results[1].var - results[0].var) /
                                        results[0].var) *
                                        100}
                                    %)
                                </p>
                            </>
                        ) : null}

                        {results[2] != null ? (
                            <>
                                <h2 className='font-bold'>Perturbed Data 2</h2>
                                <p>
                                    {" "}
                                    {results[2].var} (
                                    {((results[2].var - results[0].var) /
                                        results[0].var) *
                                        100}
                                    %)
                                </p>
                            </>
                        ) : null}
                    </div>
                    <div>
                        <h1 className='text-3xl mt-3 mb-2'>Range</h1>
                        <h2 className='font-bold'>Original Data</h2>
                        <p>Max: {results[0].max} </p>
                        <p>Min: {results[0].min}</p>

                        {results[1] != null ? (
                            <>
                                <h2 className='font-bold'>Perturbed Data 1</h2>
                                <p>Max: {results[1].max}</p>
                                <p>Min: {results[1].min}</p>
                            </>
                        ) : null}

                        {results[2] != null ? (
                            <>
                                <h2 className='font-bold'>Perturbed Data 2</h2>
                                <p>Max: {results[2].max}</p>
                                <p>Min: {results[2].min}</p>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AnalysisView;
