// Local Differential Privacy in Temporal Setting

export class TldpUtilities {
    static PerturbationProbability(epsilon, k, j) {
        if (j === 0) {
            return (
                Math.pow(Math.E, epsilon / 2) / (k - 1 + Math.pow(Math.E, epsilon / 2))
            );
        } else return 1 / (k - 1 + Math.pow(Math.E, epsilon / 2));
    }

    static PerturbationProbabilityValues(epsilon, k) {
        console.log("j = 0:", TldpUtilities.PerturbationProbability(epsilon, k, 0));
        console.log("j = n:", TldpUtilities.PerturbationProbability(epsilon, k, 1));
    }
}

export class Tldp {
    dataRaw = [];
    dataPerturbed = [];
    probabilities = [];
    constructor(arr) {
        this.dataRaw = arr;
    }

    // Backward Perturbation Mechanism
    BackwardPerturbationMechanism(k, epsilon) {
        this.dataPerturbed = [];

        for (var i = 0; i < this.dataRaw.length; i++) {
            var tmpK = k;
            if (i < k - 1) tmpK = i + 1;

            var seed = Math.random();

            var idx = 1;

            TldpUtilities.PerturbationProbabilityValues(epsilon, tmpK);
            for (var j = 0; j <= tmpK; j++) {
                idx -= TldpUtilities.PerturbationProbability(epsilon, tmpK, j);

                if (idx <= seed) {
                    this.dataPerturbed[i] = this.dataRaw[i - j];

                    break;
                }
            }
        }
    }

    // Forward Perturbation Mechanism
    ForwardPerturbationMechanism(k, epsilon) {
        this.dataPerturbed = [];

        for (var i = 0; i < this.dataRaw.length; i++) {


            var seed = Math.random();
            this.probabilities[i] = seed;
            var idx = 0;

            TldpUtilities.PerturbationProbabilityValues(epsilon, k);
            for (var j = 0; j <= k; j++) {
                idx += TldpUtilities.PerturbationProbability(epsilon, k, j);

                if (idx <= seed) {

                    this.dataPerturbed[i + j] = this.dataRaw[i];

                    break;
                }
            }
        }


        for (let i = 0; i < this.dataPerturbed.length; i++) {
            if (!this.dataPerturbed[i]) this.dataPerturbed[i] = ""
        }

    }
}
