

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


    constructor(arr) { this.dataRaw = arr }




    // Backward Perturbation Mechanism
    BackwardPerturbationMechanism(k, epsilon) {

        // array d
        var dataPerturbed = [];

        // tbc
        for (var i = 0; i < this.dataRaw.length; i++) {

            var tmpK = k;
            if (i < k - 1) tmpK = i + 1;

            seed = Math.random();
            idx = 0;
            for (var j = 0; j < tmpK; ++j) {

                idx += LDPUtilities.PerturbationProbability(epsilon, tmpK, j);

            }



        }



        return dataPerturbed;

    }




}



