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
                for (let i1 = 1; i1 <= l + 1; i1++) {
                    let product2 = 1;
                    for (let i2 = 1; i2 <= l - 1; i2++) {
                        let tmp = TldpUtilities.EtmG(k - i2, m - i2);
                        product2 *= tmp;
                    }
                    product1 *= ((k - i1) / i1) * product2;
                }
                sum1 += Math.pow(-1 / c0, l) * product1;
            }
            let result = m / (1 - sum1);
            return result;
        }
    }
    static EtmDispatchProbability(k, c0, j) {
        // m = k - c0
        let m = k - c0;
        // p_0
        if (j == 0) {
            let result = 1 - TldpUtilities.EtmG(k, m);
            return result;
        } else if (j == 1) {
            // p_1
            let sum = 0;
            for (let l = 1; l <= m; l++) {
                let product1 = 1;
                for (let i = 0; i <= l - 1; i++) {
                    let product2 = 1;
                    for (let i = 1; i <= l; i++) {
                        let tmp = (k - 1 - i) / i;
                        product2 *= tmp;
                    }
                    let tmp = TldpUtilities.EtmG(k - i, m - i);
                    tmp = tmp.toPrecision(9);
                    product1 *= TldpUtilities.EtmG(k - i, m - i) * product2;
                }
                let tmp = -1 / c0;
                tmp = tmp.toPrecision(9);
                let tmp2 = Math.pow(tmp, l);
                tmp2 = tmp2.toPrecision(9);
                product1 = product1.toPrecision(9);
                sum += tmp2 * product1;
            }
            return TldpUtilities.EtmG(k, m) + sum;
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
                    product1 = product1.toPrecision(9);
                }
                sum1 += Math.pow(-1 / c0, l) * product1;
            }
            let result = -1 * sum1;

            return result;
        }
    }
    static EtmDerivedEpsilon(k, c0) {
        let p0 = TldpUtilities.EtmDispatchProbability(k, c0, 0);
        let p1 = TldpUtilities.EtmDispatchProbability(k, c0, 1);
        let pk_1 = TldpUtilities.EtmDispatchProbability(k, c0, k - 1);
        p0 = parseFloat(p0).toPrecision(9);
        p1 = parseFloat(p1).toPrecision(9);
        pk_1 = parseFloat(pk_1).toPrecision(9);

        let a = Math.log(p1 / p0);
        let b = Math.log(p1 / pk_1);

        let derivedEpsilon = 2.0 * Math.max(a, b);
        return derivedEpsilon;
    }

    static optimalThreshold(k, epsilon) {
        let optimalThreshold = -1;

        for (let i = 2; i < k; i++) {
            let tmp = TldpUtilities.EtmDerivedEpsilon(k, i);
            tmp = parseFloat(tmp).toPrecision(3);

            if (tmp < epsilon && tmp > 0.05) {

                optimalThreshold = i;
                break;
            }
        }
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
        console.log(dataPerturbed);
        return {
            result: dataPerturbed,
            debugArr,
            resultFilled: dataPerturbedFilled,
        };
    }
    // Threshold Mechanism
    static ThresholdMechanismExtendedPerturb(data, k, r, epsilon) {
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
                let p1 = TldpUtilities.EtmDispatchProbability(k, r, 1);
                let p0 = TldpUtilities.EtmDispatchProbability(k, r, 0);
                p0 = parseFloat(p0).toPrecision(5);
                p1 = parseFloat(p1).toPrecision(5);
                if (p1 <= 0) p1 = 0.001;
                let p = (Math.pow(Math.E, epsilon / 2) * p0) / p1;
                console.log(p0);
                console.log(p1);
                console.log(p);
                let seed = Math.random();
                console.log(seed);
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
    static ExtendedThresholdMechanismTest(data, k, epsilon) {
        // parameter epsilon: input privacy budget
        // initialize binary search range l = 2 and r = k - 1
        let l = 2;
        let r = k - 1;
        let optimalThreshold;
        while (l < r) {
            let c0 = Math.floor((l + r) / 2);
            console.log(
                "l:" + l + " r:" + r + " c0:" + c0 + " c0*: " + optimalThreshold
            );
            let derivedEpsilon1 = TldpUtilities.EtmDerivedEpsilon(k, c0);
            console.log("derivedEpsilon1: " + derivedEpsilon1);
            if (derivedEpsilon1 < epsilon) l = c0;
            else {
                let derivedEpsilon2 = TldpUtilities.EtmDerivedEpsilon(
                    k,
                    c0 - 1
                );
                console.log("derivedEpsilon2: " + derivedEpsilon2);
                if (derivedEpsilon2 > derivedEpsilon1 || isNaN(derivedEpsilon2))
                    l = c0;
                else r = c0;
            }
            console.log(
                "l:" + l + " r:" + r + " c0:" + c0 + " c0*: " + optimalThreshold
            );
            if (l + 1 == r) {
                let derivedEpsilon3 = TldpUtilities.EtmDerivedEpsilon(k, l);
                let derivedEpsilon4 = TldpUtilities.EtmDerivedEpsilon(k, r);
                console.log("derivedEpsilon3: " + derivedEpsilon3);
                console.log("derivedEpsilon4: " + derivedEpsilon4);
                if (derivedEpsilon3 <= epsilon) {
                    optimalThreshold = l;
                    console.log(
                        "l:" +
                        l +
                        " r:" +
                        r +
                        " c0:" +
                        c0 +
                        " c0*: " +
                        optimalThreshold
                    );
                    break;
                } else if (derivedEpsilon4 <= epsilon) {
                    optimalThreshold = r;
                    console.log(
                        "l:" +
                        l +
                        " r:" +
                        r +
                        " c0:" +
                        c0 +
                        " c0*: " +
                        optimalThreshold
                    );
                    break;
                } else {
                    l = r;
                    r = k - 1;
                    console.log(
                        "l:" +
                        l +
                        " r:" +
                        r +
                        " c0:" +
                        c0 +
                        " c0*: " +
                        optimalThreshold
                    );
                    while (l < r) {
                        c0 = Math.floor((l + r) / 2);
                        let derivedEpsilon5 = TldpUtilities.EtmDerivedEpsilon(
                            k,
                            c0
                        );
                        console.log("derivedEpsilon5: " + derivedEpsilon5);
                        if (derivedEpsilon5 <= epsilon) r = c0;
                        else l = c0;
                        if (l + 1 == r) {
                            // return Tldp.ThresholdMechanismExtendedPerturb(data, k, r, epsilon);
                            console.log(
                                "return: ThresholdMechanism  k=" +
                                k +
                                " optimalThreshold=" +
                                optimalThreshold
                            );
                            return Tldp.ThresholdMechanism(
                                data,
                                k,
                                optimalThreshold
                            );
                        }
                    }
                }
            }
        }
        // return Tldp.ThresholdMechanism(data, k, optimalThreshold);
        console.log(
            "return: ThresholdMechanism Extended Perturb  k=" + k + " r=" + r
        );
        return Tldp.ThresholdMechanismExtendedPerturb(data, k, r, epsilon);
    }

    // (Extended) Threshold Mechanism
    static ExtendedThresholdMechanism(data, k, epsilon) {
        let optimalThresholdValue = TldpUtilities.optimalThreshold(k, epsilon);
        let r = Math.floor(k / 2);
        if (optimalThresholdValue == -1) {
            return Tldp.ThresholdMechanismExtendedPerturb(data, k, r, epsilon)
        } else {
            return Tldp.ThresholdMechanism(data, k, optimalThresholdValue);
        }

    }
}
