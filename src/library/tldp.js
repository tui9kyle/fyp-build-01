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
        var dataPerturbed = [];
        var debugArr = [];
        for (var i = 0; i < data.length; i++) {
            var tmpK = k;
            if (i < k - 1) tmpK = i + 1;

            var seed = Math.random();
            debugArr[i] = seed;
            var idx = 1;

            for (var j = 0; j <= tmpK; j++) {
                idx -= TldpUtilities.PerturbationProbability(epsilon, tmpK, j);

                if (idx <= seed) {
                    dataPerturbed[i] = data[i - j];

                    break;
                }
            }
        }

        return { result: dataPerturbed, debugArr };
    }

    // Forward Perturbation Mechanism
    static ForwardPerturbationMechanism(data, k, epsilon) {
        var dataPerturbed = [];
        var debugArr = [];

        for (var i = 0; i < data.length; i++) {
            var seed = Math.random();
            debugArr[i] = seed;
            var idx = 0;

            for (var j = 0; j <= k; j++) {
                idx += TldpUtilities.PerturbationProbability(epsilon, k, j);

                if (idx >= seed) {
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
}
