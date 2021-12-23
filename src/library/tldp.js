

// Local Differential Privacy in Temporal Setting



class LDPUtilities {

    PerturbationProbability(epsilon, k, j) {


        if (j === 0) {

            return (Math.pow(Math.E, epsilon / 2) / (k - 1 + Math.pow(Math.E, epsilon / 2)));

        } else
            return 1 / (k - 1 + Math.pow(Math.E, epsilon / 2));

    }

}

export class TLDP {

    static utilities = new LDPUtilities();
    dataRaw;
    dataPerturbed;
    constructor(arr) { this.dataRaw = arr }



    // Backward Perturbation Mechanism
    BackwardPerturbationMechanism(arr) {

        // array d
        var newArr;



    }




}


