// Differential Privacy

export class VldpUtilities {
    static Laplace(mu, b) {
        function sgn(x) {
            return x < 0 ? -1 : 1;
        }

        var U = Math.random() - 0.5;
        return mu - b * sgn(U) * Math.log(1 - 2 * Math.abs(U));
    }
    static LaplaceNoise(sensitivity, epsilon) {
        return VldpUtilities.Laplace(0.0, sensitivity / epsilon);
    }
}

export class Vldp {
    // Laplace mechanism
    static LaplaceMechanism(data, sensitivity, epsilon) {
        var dataPerturbed = [];
        var debugArr = [];
        for (var i = 0; i < data.length; i++) {
            let noise = VldpUtilities.LaplaceNoise(sensitivity, epsilon);
            debugArr[i] = noise;
            dataPerturbed[i] = data[i] + noise;
        }

        return { result: dataPerturbed, debugArr };
    }
}
