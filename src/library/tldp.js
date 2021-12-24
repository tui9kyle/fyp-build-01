

// Local Differential Privacy in Temporal Setting



class LDPUtilities {

    static PerturbationProbability(epsilon, k, j) {


        if (j === 0) {

            return (Math.pow(Math.E, epsilon / 2) / (k - 1 + Math.pow(Math.E, epsilon / 2)));

        } else
            return 1 / (k - 1 + Math.pow(Math.E, epsilon / 2));

    }

}


export class Tldp {


    dataRaw;
    dataPerturbed;

    constructor(arr) { this.dataRaw = arr }




    // Backward Perturbation Mechanism
    BackwardPerturbationMechanism(k, epsilon) {

        // array d
        this.dataPerturbed = [];

        // tbc
        for (var i = 0; i < this.dataRaw.length; i++) {

            var tmpK = k;
            if (i < k - 1) tmpK = i + 1;

            var seed = Math.random();
            var idx = 0;
            for (var j = 0; j <= tmpK; j++) {
                console.log(j, seed);
                idx += LDPUtilities.PerturbationProbability(epsilon, tmpK, j);
                if (idx >= seed) {
                    this.dataPerturbed[i] = this.dataRaw[i + j];
                    break;
                }

            }



        }



        return this.dataPerturbed;

    }




}



