// Differential Privacy

export class VldpUtilities {
    static Laplace(mu, b) {
        function sgn(x) {
            return x < 0 ? -1 : 1;
        }

        var U = Math.random() - 0.5;
        return mu - b * sgn(U) * Math.log(1 - 2 * Math.abs(U));
    }
    static LaplaceNoise(epsilon) {

return(VldpUtilities.Laplace(0.0, 1/epsilon));

    }
}

export class Vldp {
    // Laplace mechanism
    static LaplaceMechanism(data, epsilon) {
        var dataPerturbed = [];
        var debugArr = [];
        for (var i = 0; i < data.length; i++) {
            let noise = VldpUtilities.LaplaceNoise(epsilon)
            debugArr[i] = noise;
            dataPerturbed[i] = data[i] + noise;

        }

        return { result: dataPerturbed, debugArr };
    }
}
