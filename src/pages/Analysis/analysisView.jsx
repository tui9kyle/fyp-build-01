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
                                    </div>
                                    <div>
                                        <p>
                                            <b className='font-bold mr-4'>
                                                Sum
                                            </b>
                                            {ctx.sum}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.sum -
                                                        results[0].sum) /
                                                        results[0].sum) *
                                                        100}
                                                    %)
                                                </>
                                            ) : null}
                                        </p>

                                        <p>
                                            <b className='font-bold mr-4'>
                                                Average
                                            </b>
                                            {ctx.avg}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.avg -
                                                        results[0].avg) /
                                                        results[0].avg) *
                                                        100}
                                                    %)
                                                </>
                                            ) : null}
                                        </p>

                                        <p>
                                            <b className='font-bold mr-4'>
                                                Variance
                                            </b>
                                            {ctx.var}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.var -
                                                        results[0].var) /
                                                        results[0].var) *
                                                        100}
                                                    %)
                                                </>
                                            ) : null}
                                        </p>
                                        <p>
                                            <b className='font-bold mr-4'>
                                                Max
                                            </b>
                                            {ctx.max}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.max -
                                                        results[0].max) /
                                                        results[0].max) *
                                                        100}
                                                    %)
                                                </>
                                            ) : null}
                                        </p>
                                        <p>
                                            <b className='font-bold mr-4'>
                                                Min
                                            </b>
                                            {ctx.min}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.min -
                                                        results[0].min) /
                                                        results[0].min) *
                                                        100}
                                                    %)
                                                </>
                                            ) : null}
                                        </p>
                                    </div>
                                </>
                            );
                    })}
                </div>
            </div>
        </>
    );
};

export default AnalysisView;
