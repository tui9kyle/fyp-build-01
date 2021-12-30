// Differential Privacy

export class DpUtilities {
    static Laplace(mu, b) {
        function sgn(x) {
            return x < 0 ? -1 : 1;
        }

        var U = Math.random() - 0.5;
        return mu - b * sgn(U) * Math.log(1 - 2 * Math.abs(U));
    }
}

export class Dp {
    // Laplace mechanism
    static LaplaceMechanism(data, sensitivity, epsilon) {
        var dataPerturbed = [];
        var debugArr = [];
        for (var i = 0; i < data.length; i++) {
            debugArr[i] = DpUtilities.Laplace(0.0, sensitivity / epsilon);
            dataPerturbed[i] =
                data[i] + DpUtilities.Laplace(0.0, sensitivity / epsilon);
        }

        return { result: dataPerturbed, debugArr };
    }
}
