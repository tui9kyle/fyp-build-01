function ExtendedThresholdMechanism(data, k, epsilon) {
    let optimalThreshold = optimalThreshold(k, epsilon);
    if (optimalThreshold == -1)
        return Tldp.ThresholdMechanismExtendedPerturb(data, k, epsilon);
    else return Tldp.ThresholdMechanism(data, k, optimalThreshold);}
    // parameter epsilon: input privacy budget
    // initialize binary search range l = 2 and r = k - 1
    let l = 2;
    let r = k - 1;
    let optimalThreshold;
    while (l < r) {
        let c0 = Math.floor((l + r) / 2);
        console.log(
            "l:" + l + " r:" + r + " c0:" + c0 + " c0*: " + optimalThreshold
        );
        let derivedEpsilon1 = TldpUtilities.EtmDerivedEpsilon(k, c0);
        console.log("derivedEpsilon1: " + derivedEpsilon1);
        if (derivedEpsilon1 < epsilon) l = c0;
        else {
            let derivedEpsilon2 = TldpUtilities.EtmDerivedEpsilon(k, c0 - 1);
            console.log("derivedEpsilon2: " + derivedEpsilon2);
            if (derivedEpsilon2 > derivedEpsilon1 || isNaN(derivedEpsilon2))
                l = c0;
            else r = c0;
        }
        console.log(
            "l:" + l + " r:" + r + " c0:" + c0 + " c0*: " + optimalThreshold
        );
        if (l + 1 == r) {
            let derivedEpsilon3 = TldpUtilities.EtmDerivedEpsilon(k, l);
            let derivedEpsilon4 = TldpUtilities.EtmDerivedEpsilon(k, r);
            console.log("derivedEpsilon3: " + derivedEpsilon3);
            console.log("derivedEpsilon4: " + derivedEpsilon4);
            if (derivedEpsilon3 <= epsilon) {
                optimalThreshold = l;
                console.log(
                    "l:" +
                        l +
                        " r:" +
                        r +
                        " c0:" +
                        c0 +
                        " c0*: " +
                        optimalThreshold
                );
                break;
            } else if (derivedEpsilon4 <= epsilon) {
                optimalThreshold = r;
                console.log(
                    "l:" +
                        l +
                        " r:" +
                        r +
                        " c0:" +
                        c0 +
                        " c0*: " +
                        optimalThreshold
                );
                break;
            } else {
                l = r;
                r = k - 1;
                console.log(
                    "l:" +
                        l +
                        " r:" +
                        r +
                        " c0:" +
                        c0 +
                        " c0*: " +
                        optimalThreshold
                );
                while (l < r) {
                    c0 = Math.floor((l + r) / 2);
                    let derivedEpsilon5 = TldpUtilities.EtmDerivedEpsilon(
                        k,
                        c0
                    );
                    console.log("derivedEpsilon5: " + derivedEpsilon5);
                    if (derivedEpsilon5 <= epsilon) r = c0;
                    else l = c0;
                    if (l + 1 == r) {
                        // return Tldp.ThresholdMechanismExtendedPerturb(data, k, r, epsilon);
                        console.log(
                            "return: ThresholdMechanism  k=" +
                                k +
                                " optimalThreshold=" +
                                optimalThreshold
                        );
                        return Tldp.ThresholdMechanism(
                            data,
                            k,
                            optimalThreshold
                        );
                    }
                }
            }
        }
    }
    // return Tldp.ThresholdMechanism(data, k, optimalThreshold);
    console.log(
        "return: ThresholdMechanism Extended Perturb  k=" + k + " r=" + r
    );
    return Tldp.ThresholdMechanismExtendedPerturb(data, k, r, epsilon);
}
