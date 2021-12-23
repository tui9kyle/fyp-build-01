

// Local Differential Privacy in Temporal Setting


class TLDPData {
    static data;
    constructor(data) { this.data = data }
}


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
    data;

    constructor(data) { this.data = new TLDPData(data) }



    // Backward Perturbation Mechanism
    BackwardPerturbationMechanism(d) {

        // array d


    }




}


