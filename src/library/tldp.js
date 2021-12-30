// Local Differential Privacy in Temporal Setting

export class TldpUtilities {
    static PerturbationProbability(epsilon, k, j) {
        if (j === 0) {
            return (
                Math.pow(Math.E, epsilon / 2) /
                (k - 1 + Math.pow(Math.E, epsilon / 2))
            );
        } else return 1 / (k - 1 + Math.pow(Math.E, epsilon / 2));
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

        return { result: dataPerturbed, debugArr };
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

        for (let i = 0; i < dataPerturbed.length; i++) {
            if (!dataPerturbed[i]) dataPerturbed[i] = "";
        }

        return { result: dataPerturbed, debugArr };
    }

    // Threshold Mechanism
    static ThresholdMechanism(data, k, c0) {
        let dataPerturbed = [];
        let x = Array(data.length).fill(0);

        for (let i = 0; i < data.length; i++) {
            // ! logic error: c should count i to i+k-1
            let c = x.filter((v) => v == 0).length;
            if (c > c0) {
                // Randomly select an index l from X = {j|x_j = 0, i ≤ j ≤ i+k−1}
                let p = Math.random();
                let idx = Math.floor(p / c);
                for (let j = 0; j <= idx; j++) {
                    if (x[i + j] != 0) {
                        idx++;
                    }
                }
                // Dispatch S_i to R_l , and set x_l = 1
                dataPerturbed[idx] = data[i];
                x[idx] = 1;
            } else if (x[i] == 0) {
                dataPerturbed[i] = data[i];
                x[i] = 1;
            } else {
                let p = Math.random();
                let idx = Math.floor(p / c);
                for (let j = 0; j <= idx; j++) {
                    if (x[i + j] != 0) {
                        idx++;
                    }
                }
                dataPerturbed[idx] = data[i];
                x[idx] = 1;
            }
        }

        return { result: dataPerturbed };
    }
}
