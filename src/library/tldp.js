

// Local Differential Privacy in Temporal Setting



export class TldpUtilities {

    static PerturbationProbability(epsilon, k, j) {


        if (j === 0) {

            return (Math.pow(Math.E, epsilon / 2) / (k - 1 + Math.pow(Math.E, epsilon / 2)));

        } else
            return 1 / (k - 1 + Math.pow(Math.E, epsilon / 2));

    }

    static PerturbationProbabilityValues(epsilon, k) {

        console.log("j = 0:", TldpUtilities.PerturbationProbability(epsilon, k, 0))
        console.log("j = n:", TldpUtilities.PerturbationProbability(epsilon, k, 1))

    }

}





export class Tldp {


    dataRaw = [];
    dataPerturbed = [];
probabilities = [];
    constructor(arr) { this.dataRaw = arr }




    // Backward Perturbation Mechanism
    BackwardPerturbationMechanism(k, epsilon) {

        this.dataPerturbed = [];




        for (var i = 0; i < this.dataRaw.length; i++) {

            var tmpK = k;
            if (i < k - 1) tmpK = i + 1;
            console.log("tmpK:", tmpK);
            var seed = Math.random();
            this.probabilities[i] = seed; 
            var idx = 1;

            console.log("-> i:", i, " P:", seed);
            TldpUtilities.PerturbationProbabilityValues(epsilon, tmpK);
            for (var j = 0; j <= tmpK; j++) {

                idx -= TldpUtilities.PerturbationProbability(epsilon, tmpK, j);
                console.log(">idx:", idx);
                if (idx <= seed) {


                    console.log("j:", j, " i-j:", i - j);
                    console.log("!!!", "k:", k, "j:", j)
                    this.dataPerturbed[i] = this.dataRaw[i - j];
                    console.log(this.dataRaw[i - j], this.dataPerturbed[i]);
                    console.log("-----")
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
                idx += TldpUtilities.PerturbationProbability(epsilon, k, j);
                if (idx >= seed) {
                    this.dataPerturbed[i] = this.dataRaw[i + j];
                    break;
                }

            }



        }



        return this.dataPerturbed;

    }




}



