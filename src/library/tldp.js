

// Local Differential Privacy in Temporal Setting


 class TLDPData {
    static data;
    constructor(data) { this.data = data }
}


 class LDPUtilities {

    PerturbationProbability(epsilon, k, j) {


        if (j == 0) {

            return (Math.pow(Math.E, epsilon / 2) / (k - 1 + Math.pow(Math.E, epsilon / 2)));

        } else
            return 1 / (k - 1 + Math.pow(Math.E, epsilon / 2));

    }

}

export  default class TLDP {
 
   static utilities =  new LDPUtilities();
static data = new TLDPData();                                                                                                                                                                                                                                                                                                                                                                

    // Backward Perturbation Mechanism
    BackwardPerturbationMechanism(d) {

        // array d

    
    }




}


