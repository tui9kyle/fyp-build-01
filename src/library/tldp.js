// Local Differential Privacy in Temporal Setting

export class TldpUtilities {
    static BaselinePerturbationProbability(epsilon, k, j) {
        if (j === 0) {
            return (
                Math.pow(Math.E, epsilon / 2) /
                (k - 1 + Math.pow(Math.E, epsilon / 2))
            );
        } else return 1 / (k - 1 + Math.pow(Math.E, epsilon / 2));
    }

    static EtmG(k, m) {
        // base case
        if (m == 1) {
            return 2 / k;
        } else {
            //  m = k - c0;
            let c0 = k - m;
            let sum1 = 0;
            for (let l = 1; l <= m; l++) {
                let product1 = 1;
                for (let i = 1; i <= l + 1; i++) {
                    let product2 = 1;
                    for (let i = 1; i <= l - 1; i++) {
                        product2 *= TldpUtilities.EtmG(k - i, m - i);
                    }
                    product1 *= ((k - i) / i) * product2;
                }
                sum1 += Math.pow(-1 / c0, l) * product1;
            }
            return m / (1 - sum1);
        }
    }

    static EtmDispatchProbability(k, c0, j) {
        // m = k - c0
        let m = k - c0;
        // p_0
        if (j == 0) {
            console.log("gkm: " + TldpUtilities.EtmG(k, m));
            return 1 - TldpUtilities.EtmG(k, m);
        } else if (j == 1) {
            let sum1 = 0;
            for (let l = 1; l <= m; l++) {
                let product1 = 1;
                for (let i = 0; i <= l - 1; i++) {
                    let product2 = 1;
                    for (let i = 1; i <= l; i++) {
                        product2 *= (k - 1 - i) / i;
                    }
                    product1 *= TldpUtilities.EtmG(k - i, m - i) * product2;
                }
                sum1 += Math.pow(-1 / c0, l) * product1;
            }
            return TldpUtilities.EtmG(k, m) + sum1;
        } else {
            // j > 1
            let sum1 = 0;
            for (let l = 1; l <= m; l++) {
                let product1 = 1;
                for (let i = 0; i <= l - 1; i++) {
                    let product2 = 1;
                    for (let i = 1; i <= l - 1; i++) {
                        product2 *= ((k - j - i) / (i + 1)) * l;
                    }
                    product1 *= TldpUtilities.EtmG(k - i, m - i) * product2;
                }
                sum1 += Math.pow(-1 / c0, l) * product1;
            }
            return -1 * sum1;
        }
    }

    static EtmOptimalThreshold(k, c0) {
        console.log("k: " + k + " c0: " + c0);
        for (let i = 0; i < k; i++) {
            console.log(
                "p(" +
                    i +
                    "): " +
                    TldpUtilities.EtmDispatchProbability(k, c0, i)
            );
        }

        let optimalThreshold =
            2.0 *
            Math.max(
                Math.log(
                    TldpUtilities.EtmDispatchProbability(k, c0, 0) /
                        TldpUtilities.EtmDispatchProbability(k, c0, 1)
                ),
                Math.log(
                    TldpUtilities.EtmDispatchProbability(k, c0, k - 1) /
                        TldpUtilities.EtmDispatchProbability(k, c0, 1)
                )
            );

        console.log(optimalThreshold);
        return optimalThreshold;
    }
}

export class Tldp {
    // Backward Perturbation Mechanism
    static BackwardPerturbationMechanism(data, k, epsilon) {
        let dataPerturbed = [];
        let debugArr = [];
        for (let i = 0; i < data.length; i++) {
            let tmpK = k;
            if (i < k - 1) tmpK = i + 1;

            let p = Math.random();
            debugArr[i] = p;
            let idx = 1;

            for (let j = 0; j <= tmpK; j++) {
                idx -= TldpUtilities.BaselinePerturbationProbability(
                    epsilon,
                    tmpK,
                    j
                );

                if (idx <= p) {
                    dataPerturbed[i] = data[i - j];

                    break;
                }
            }
        }

        return { result: dataPerturbed, debugArr, resultFilled: dataPerturbed };
    }

    // Forward Perturbation Mechanism
    static ForwardPerturbationMechanism(data, k, epsilon) {
        let dataPerturbed = [];
        let debugArr = [];

        for (let i = 0; i < data.length; i++) {
            let p = Math.random();
            debugArr[i] = p;
            let idx = 0;

            for (let j = 0; j <= k; j++) {
                idx += TldpUtilities.BaselinePerturbationProbability(
                    epsilon,
                    k,
                    j
                );

                if (idx >= p) {
                    dataPerturbed[i + j] = data[i];

                    break;
                }
            }
        }
        let dataPerturbedFilled = dataPerturbed;

        for (let i = 0; i < dataPerturbed.length; i++) {
            if (!dataPerturbed[i]) dataPerturbedFilled[i] = "-";
            else {
                dataPerturbedFilled[i] = dataPerturbed[i];
            }
        }

        return {
            result: dataPerturbed,
            debugArr,
            resultFilled: dataPerturbedFilled,
        };
    }

    // Threshold Mechanism
    static ThresholdMechanism(data, k, c0) {
        let dataPerturbed = [];
        let debugArr = [];

        for (let i = 0; i < data.length; i++) {
            // count the number of 0s in {x[i], x[i+1], ..., x[i+k-1]}
            let c = 0;
            for (let j = i; j < i + k; j++) {
                if (dataPerturbed[j] == null) c++;
            }

            if (c > c0) {
                // randomly select an index l from {i <= j < i+k}
                // and dataPerturbed[j] == 0

                let p = Math.random();
                let idx = Math.floor(p * k + i);

                for (let j = i; j <= idx; j++) {
                    if (dataPerturbed[j] != null) {
                        idx++;
                    }
                }

                dataPerturbed[idx] = data[i];
            } else if (dataPerturbed[i] == null) {
                dataPerturbed[i] = data[i];
            } else {
                let p = Math.random();
                let idx = Math.floor(p * (k - 1) + (i + 1));

                for (let j = i; j <= idx; j++) {
                    if (dataPerturbed[j] != null) {
                        idx++;
                    }
                }

                dataPerturbed[idx] = data[i];
            }
        }

        let dataPerturbedFilled = dataPerturbed;

        for (let i = 0; i < dataPerturbed.length; i++) {
            if (!dataPerturbed[i]) dataPerturbedFilled[i] = "-";
            else {
                dataPerturbedFilled[i] = dataPerturbed[i];
            }
        }

        return {
            result: dataPerturbed,
            debugArr,
            resultFilled: dataPerturbedFilled,
        };
    }

    // Threshold Mechanism
    static ThresholdMechanismExtendedPerturb(data, k, r, epsilon, p0, p1) {
        let dataPerturbed = [];
        let debugArr = [];

        for (let i = 0; i < data.length; i++) {
            let c = 0;
            for (let j = i; j < i + k; j++) {
                if (dataPerturbed[j] == null) c++;
            }

            if (c > r) {
                let p = Math.random();
                let idx = Math.floor(p * k + i);

                for (let j = i; j <= idx; j++) {
                    if (dataPerturbed[j] != null) {
                        idx++;
                    }
                }

                dataPerturbed[idx] = data[i];
            } else if (dataPerturbed[i] == null) {
                //  S_i is dispatched to R_i with p = (e^(\epsilon / 2) p_1) / p_2

                let p = (Math.pow(Math.E, epsilon / 2) * p1) / p0;
                let seed = Math.random();
                if (seed < p) dataPerturbed[i] = data[i];
            } else {
                let p = Math.random();
                let idx = Math.floor(p * (k - 1) + (i + 1));

                for (let j = i; j <= idx; j++) {
                    if (dataPerturbed[j] != null) {
                        idx++;
                    }
                }

                dataPerturbed[idx] = data[i];
            }
        }

        let dataPerturbedFilled = dataPerturbed;

        for (let i = 0; i < dataPerturbed.length; i++) {
            if (!dataPerturbed[i]) dataPerturbedFilled[i] = "-";
            else {
                dataPerturbedFilled[i] = dataPerturbed[i];
            }
        }

        return {
            result: dataPerturbed,
            debugArr,
            resultFilled: dataPerturbedFilled,
        };
    }

    // (Extended) Threshold Mechanism
    static ExtendedThresholdMechanism(data, k, epsilon) {
        // parameter epsilon: input privacy budget

        // initialize binary search range l = 2 and r = k - 1

        let l = 2;
        let r = k - 1;
        let c0star;
        while (l < r) {
            let c0 = Math.floor((l + r) / 2);
            let hatEpsilon1 = TldpUtilities.EtmOptimalThreshold(k, c0);
            console.log("hatEpsilon1:" + hatEpsilon1);
            if (hatEpsilon1 < epsilon) {
                l = c0;
            } else {
                let hatEpsilon2 = TldpUtilities.EtmOptimalThreshold(k, c0 - 1);
                console.log("hatEpsilon2:" + hatEpsilon2);
                if (hatEpsilon2 > hatEpsilon1) l = c0;
                else r = c0;
            }
            if (l + 1 == r) {
                console.log("l: " + l);
                console.log("r: " + r);
                let hatEpsilon3 = TldpUtilities.EtmOptimalThreshold(k, l);
                let hatEpsilon4 = TldpUtilities.EtmOptimalThreshold(k, r);

                if (hatEpsilon3 <= epsilon) {
                    c0star = l;
                    break;
                } else if (hatEpsilon4 <= epsilon) {
                    c0star = r;
                    break;
                } else {
                    // extended Threshold Mechanism
                    l = r;
                    r = k - 1;
                    while (l < r) {
                        c0 = Math.floor((l + r) / 2);
                        let hatEpsilon5 = TldpUtilities.EtmOptimalThreshold(
                            k,
                            c0
                        );
                        if (hatEpsilon5 <= epsilon) r = c0;
                        else l = c0;

                        if (l + 1 == r) {
                            // return R ExtendedPerturb(S,k,r)
                            return Tldp.ThresholdMechanismExtendedPerturb(
                                data,
                                k,
                                r,
                                epsilon,
                                TldpUtilities.EtmDispatchProbability(k, c0, 0),
                                TldpUtilities.EtmDispatchProbability(k, c0, 1)
                            );
                        }
                    }
                }
            }
        }

        return Tldp.ThresholdMechanism(data, k, c0star);
    }
}
