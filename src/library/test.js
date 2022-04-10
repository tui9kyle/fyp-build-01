
function EtmG(k, m) {
    // base case
    if (m == 1) {
        return 2 / k;
    } else {
        //  m = k - c0;
        let c0 = k - m;
        let sum1 = 0;
        for (let l = 1; l <= m; l++) {
            let product1 = 1;
            for (let i1 = 1; i1 <= (l + 1); i1++) {
                let product2 = 1;
                for (let i2 = 1; i2 <= (l - 1); i2++) {
                    let tmp = EtmG(k - i2, m - i2);

                    product2 *= tmp;
                }
                product1 *= ((k - i1) / i1) * product2;
            }
            sum1 += Math.pow(-1 / c0, l) * product1;
        }
        let result = m / (1 - sum1);
        return result;
    }
}
function EtmDispatchProbability(k, c0, j) {
    // m = k - c0
    let m = k - c0;
    console.log(m);
    // p_0
    if (j == 0) {
        let result = 1 - EtmG(k, m);
        return result;
    } else if (j == 1) {
        // p_1


        let sum = 0;
        for (let l = 1; l <= m; l++) {
            console.log("l=" + l);
            let product1 = 1;

            for (let i = 0; i <= l - 1; i++) {


                let product2 = 1;
                console.log("product2");
                for (let i = 1; i <= l; i++) {

                    let tmp = (k - 1 - i) / i;

                    product2 *= tmp;

                }

                console.log(EtmG(k - i, m - i));
                console.log(product1);
                console.log(product2);
                let tmp = EtmG(k - i, m - i);
                tmp = tmp.toPrecision(8);
                console.log(tmp);
                product1 *= EtmG(k - i, m - i) * product2;
                console.log(product1);
                console.log(EtmG(k - i, m - i) * product2 / product1);
            }
            console.log(c0, l)

            let tmp = -1 / c0;
            tmp = tmp.toPrecision(8);
            let tmp2 = (Math.pow(tmp, l));
            tmp2 = tmp2.toPrecision(8);
            product1 = product1.toPrecision(8)
            console.log(tmp);
            console.log(tmp2);
            console.log(product1);
            console.log(sum);
            console.log(tmp2 * product1);

            sum += tmp2 * product1;

        }

        return EtmG(k, m) + sum;
    } else {
        // j > 1
        let sum1 = 0;
        for (let l = 1; l <= m; l++) {
            let product1 = 1;
            for (let i = 0; i <= (l - 1); i++) {
                let product2 = 1;
                for (let i = 1; i <= (l - 1); i++) {
                    product2 *= ((k - j - i) / (i + 1)) * l;
                }
                product1 *= EtmG(k - i, m - i) * product2;
            }
            sum1 += Math.pow(-1 / c0, l) * product1;
        }
        let result = -1 * sum1;
        return result;
    }
}
function EtmDerivedEpsilon(k, c0) {
    let p0 = EtmDispatchProbability(k, c0, 0);
    let p1 = EtmDispatchProbability(k, c0, 1);
    let pk_1 = EtmDispatchProbability(k, c0, k - 1);
    p0 = parseFloat(p0).toPrecision(9)
    p1 = parseFloat(p1).toPrecision(9)
    pk_1 = parseFloat(pk_1).toPrecision(9)
    let derivedEpsilon =
        2.0 *
        Math.max(Math.log(p0 / p1), Math.log(pk_1 / p1));
    return derivedEpsilon;
}

function optimalThreshold(k, epsilon) {
    let optimalThreshold = -1;
    let derivedEpsilon;
    for (let i = 2; i < k; i++) {
        let tmp = EtmDerivedEpsilon(k, i);
        console.log(i + "=" + tmp);
        if (tmp <= epsilon) {
            derivedEpsilon = derivedEpsilon < tmp ? tmp : derivedEpsilon;
            optimalThreshold = i;
        }
    }
    return optimalThreshold;
}

let k = 5;
let epsilon = 1

// console.log(optimalThreshold(k, epsilon));



// let p0 = EtmDispatchProbability(k, Math.floor(k / 2), 0)
// let p1 = EtmDispatchProbability(k, Math.floor(k / 2), 1)




let p = parseFloat(Math.pow(Math.E, epsilon / 2)).toPrecision(9);

// console.log(p1 / p0);
// console.log(p1);
// console.log(p0);
// console.log(p);


// for (let i = 0; i < k; i++) {
//     console.log(EtmDispatchProbability(k, Math.floor(k / 2), i));
// }




console.log(EtmDispatchProbability(5, 3, 1))

