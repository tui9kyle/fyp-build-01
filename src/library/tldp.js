

// Local Differential Privacy in Temporal Setting



class LDPUtilities {

    static PerturbationProbability(epsilon, k, j) {


        if (j === 0) {

            return (Math.pow(Math.E, epsilon / 2) / (k - 1 + Math.pow(Math.E, epsilon / 2)));

        } else
            return 1 / (k - 1 + Math.pow(Math.E, epsilon / 2));

    }

    static PerturbationProbabilityValues(epsilon, k, j) {

        console.log("j = 0:", LDPUtilities.PerturbationProbability(epsilon, k, 1))
        console.log("j = n:", LDPUtilities.PerturbationProbability(epsilon, k, j))
    }

}





export class Tldp {


    dataRaw;
    dataPerturbed;

    constructor(arr) { this.dataRaw = arr }




    // Backward Perturbation Mechanism
    BackwardPerturbationMechanism(k, epsilon) {

        this.dataPerturbed = [];


        // for (var i = 0; i < this.dataRaw.length; i++) {

        //     var tmpK = k;
        //     if (i < k - 1) tmpK = i + 1;

        //     var seed = Math.random();
        //     var idx = 0;
        //     for (var j = 0; j <= tmpK; j++) {
        //         console.log(j, seed);
        //         idx += LDPUtilities.PerturbationProbability(epsilon, tmpK, j);
        //         if (idx >= seed) {
        //             this.dataPerturbed[i] = this.dataRaw[i + j];
        //             break;
        //         }
        //     }

        // }



        for (var i = 0; i < this.dataRaw.length; i++) {

            var tmpK = k;
            if (i < k - 1) tmpK = i + 1;

            var seed = Math.random();
            var idx = 1;

            console.log("i:", i, seed);
            for (var j = 0; j <= tmpK; j++) {

                idx -= LDPUtilities.PerturbationProbability(epsilon, tmpK, j);
                if (idx <= seed) {
                    this.dataPerturbed[i] = this.dataRaw[i - j];
                    console.log(" j:", j, " i-j:", i - j);
                    LDPUtilities.PerturbationProbabilityValues(epsilon, k, j);
                    break;
                }

            }



        }



        return this.dataPerturbed;

    }



    // Forward Perturbation Mechanism
    ForwardPerturbationMechanism(k, epsilon) {

        // array d
        this.dataPerturbed = [];

        // tbc
        for (var i = 0; i < this.dataRaw.length; i++) {


            var seed = Math.random();
            var idx = 0;
            for (var j = 0; j <= k; j++) {
                console.log(j, seed);
                idx += LDPUtilities.PerturbationProbability(epsilon, k, j);
                if (idx >= seed) {
                    this.dataPerturbed[i] = this.dataRaw[i + j];
                    break;
                }

            }



        }



        return this.dataPerturbed;

    }




}



