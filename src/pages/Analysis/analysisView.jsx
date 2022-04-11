import { useState } from "react";
import * as ss from "simple-statistics";
import DatasetConfigList from "../Home/components/datasetConfigList";
const AnalysisView = ({ dataRaw, dataPerturbed, dataFileMeta, ldpOptions }) => {
    let results = [];

    results[0] = {
        dataset: "Original Data",
        max: ss.max(dataRaw),
        min: ss.min(dataRaw),
        sum: ss.sum(dataRaw),
        mean: ss.mean(dataRaw),
        mode: ss.mode(dataRaw),
        median: ss.median(dataRaw),
        rms: ss.rootMeanSquare(dataRaw),
        skew: ss.sampleSkewness(dataRaw),
        var: ss.variance(dataRaw),
        sd: ss.standardDeviation(dataRaw),
        iqr: ss.interquartileRange(dataRaw),
    };
    for (let i = 1; i <= dataPerturbed.length; i++) {
        let d = dataPerturbed[i - 1].result;
        d = d.filter((e) => !isNaN(e));
        results[i] = {
            dataset: "Perturbed Data" + i,
            max: ss.max(d),
            min: ss.min(d),
            sum: ss.sum(d),
            mean: ss.mean(d),
            mode: ss.mode(d),
            median: ss.median(d),
            rms: ss.rootMeanSquare(d),
            skew: ss.sampleSkewness(d),
            var: ss.variance(d),
            sd: ss.standardDeviation(d),
            iqr: ss.interquartileRange(d),
        };
    }

    return (
        <>
            <div className='app'>
                <div className='flex flex-row flex-nowrap'>
                    <DatasetConfigList opt={dataRaw} />
                    {ldpOptions.map((opt, optIdx) => {
                        return <DatasetConfigList opt={opt} optIdx={optIdx} />;
                    })}
                </div>
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
                                        <h1 className='text-2xl mt-2 mb-1 font-sans font-extrabold'>
                                            {ctx.dataset}
                                        </h1>
                                    </div>
                                    <div>
                                        <p className='text-gray-500 font-sans '>
                                            Basic Descriptive Statistics{" "}
                                        </p>
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
                                        <p className='text-gray-500 font-sans '>
                                            Measures of central tendency{" "}
                                        </p>
                                        <p>
                                            <b className='font-bold mr-4'>
                                                Mean
                                            </b>
                                            {ctx.mean}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.mean -
                                                        results[0].mean) /
                                                        results[0].mean) *
                                                        100}
                                                    %)
                                                </>
                                            ) : null}
                                        </p>

                                        <p>
                                            <b className='font-bold mr-4'>
                                                Mode
                                            </b>
                                            {ctx.mode}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.mode -
                                                        results[0].mode) /
                                                        results[0].mode) *
                                                        100}
                                                    %)
                                                </>
                                            ) : null}
                                        </p>
                                        <p>
                                            <b className='font-bold mr-4'>
                                                Median
                                            </b>
                                            {ctx.median}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.median -
                                                        results[0].median) /
                                                        results[0].median) *
                                                        100}
                                                    %)
                                                </>
                                            ) : null}
                                        </p>
                                        <p>
                                            <b className='font-bold mr-4'>
                                                Root Mean Square
                                            </b>
                                            {ctx.rms}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.rms -
                                                        results[0].rms) /
                                                        results[0].rms) *
                                                        100}
                                                    %)
                                                </>
                                            ) : null}
                                        </p>
                                        <p>
                                            <b className='font-bold mr-4'>
                                                Skewness
                                            </b>
                                            {ctx.skew}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.skew -
                                                        results[0].skew) /
                                                        results[0].skew) *
                                                        100}
                                                    %)
                                                </>
                                            ) : null}
                                        </p>

                                        <p className='text-gray-500 font-sans '>
                                            Measures of dispersion{" "}
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
                                                Standard Deviation
                                            </b>
                                            {ctx.sd}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.sd - results[0].sd) /
                                                        results[0].sd) *
                                                        100}
                                                    %)
                                                </>
                                            ) : null}
                                        </p>
                                        <p>
                                            <b className='font-bold mr-4'>
                                                Inter-quartile Range
                                            </b>
                                            {ctx.iqr}{" "}
                                            {idx != 0 ? (
                                                <>
                                                    (
                                                    {((ctx.iqr -
                                                        results[0].iqr) /
                                                        results[0].iqr) *
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
