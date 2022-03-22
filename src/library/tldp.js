// Local Differential Privacy in Temporal Setting

import Main from "electron/main";

export class TldpUtilities {
    static PerturbationProbability(epsilon, k, j) {
        if (j === 0) {
            return (
                Math.pow(Math.E, epsilon / 2) /
                (k - 1 + Math.pow(Math.E, epsilon / 2))
            );
        } else return 1 / (k - 1 + Math.pow(Math.E, epsilon / 2));
    }
    static BinarySearch(arr, key) {
        let start = 0;
        let end = arr.length - 1;

        while (start <= end) {
            let middle = Math.floor((start + end) / 2);

            if (arr[middle] === key) {
                return middle;
            } else if (arr[middle] < key) {
                start = middle + 1;
            } else {
                end = middle - 1;
            }
        }

        return -1;
    }

    static ETMPerturbationProbability() {}

    static ETMOptimalThreshold() {
        let optimalThreshold =
            2.0 *
            Math.max(
                Math.log(
                    TldpUtilities.PerturbationProbability(epsilon, k, 0) /
                        TldpUtilities.PerturbationProbability(epsilon, k, 1)
                ),
                Math.log(
                    TldpUtilities.PerturbationProbability(epsilon, k, k - 1) /
                        TldpUtilities.PerturbationProbability(epsilon, k, 1)
                )
            );
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
                idx -= TldpUtilities.PerturbationProbability(epsilon, tmpK, j);

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
                idx += TldpUtilities.PerturbationProbability(epsilon, k, j);

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
            console.log(dataPerturbed);
            console.log(c);
            console.log(c > c0);

            if (c > c0) {
                // randomly select an index l from {i <= j < i+k}
                // and dataPerturbed[j] == 0

                let p = Math.random();
                let idx = Math.floor(p * k + i);
                console.log(p);
                console.log(idx - i);
                console.log(idx);

                for (let j = i; j <= idx; j++) {
                    if (dataPerturbed[j] != null) {
                        idx++;
                    }
                }
                console.log(idx);
                dataPerturbed[idx] = data[i];
            } else if (dataPerturbed[i] == null) {
                console.log(i);
                dataPerturbed[i] = data[i];
            } else {
                console.log(i);
                let p = Math.random();
                let idx = Math.floor(p * (k - 1) + (i + 1));
                console.log(p);
                console.log(idx);

                for (let j = i; j <= idx; j++) {
                    if (dataPerturbed[j] != null) {
                        idx++;
                    }
                }
                console.log(idx);
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
        console.log(dataPerturbed.length);
        return {
            result: dataPerturbed,
            debugArr,
            resultFilled: dataPerturbedFilled,
        };
    }

    // (Extended) Threshold Mechanism
    static ExtendedThresholdMechanism(data, k, epsilon) {
        let dataPerturbed = [];
        let debugArr = [];

        // initialize binary search range l = 2 and r = k - 1

        let l = 2;
        let r = k - 1;

        while (l < r) {
            let c0 = Math.floor((l + r) / 2);
            let hatEpsilon1 =
                2.0 *
                Math.max(
                    Math.log(
                        TldpUtilities.PerturbationProbability(epsilon, k, 0) /
                            TldpUtilities.PerturbationProbability(epsilon, k, 1)
                    ),
                    Math.log(
                        TldpUtilities.PerturbationProbability(
                            epsilon,
                            k,
                            k - 1
                        ) / TldpUtilities.PerturbationProbability(epsilon, k, 1)
                    )
                );
        }
    }
}
