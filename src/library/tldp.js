// Local Differential Privacy in Temporal Setting

class LDPUtilities {

    PerturbationProbability(epsilon, k, j) {


        if (j == 0) {

            return (Math.pow(Math.E, epsilon / 2) / (k - 1 + Math.pow(Math.E, epsilon / 2)));

        } else
            return 1 / (k - 1 + Math.pow(Math.E, epsilon / 2));

    }

}

class TLDP {


    // Backward Perturbation Mechanism
    BackwardPerturbationMechanism(d) {

    }


    

}


