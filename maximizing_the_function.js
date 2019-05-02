function f(A, i, j) {
    return A.slice(i, j + 1).reduce((acc, x) => {
        return acc ^ x;
    });
}

function g(A, x, y) {
    var sum = 0;
    for (let i = x; i <= y; i++) {
        for (let j = i; j <= y; j++) {
            sum += f(A, i, j);
        }
    }
    return sum;
}

function processData(input) {
    var data = input.split('\n'),
        [n, q] = data[0].split(' ').map((x) => parseInt(x, 10)),
        A = data[1].split(' ').map((x) => parseInt(x, 10)).slice(0, n),
        qis = data.slice(2).map((qi) => {
            return qi.split(' ').map((x) => parseInt(x, 10));
        });

    qis.forEach((qi) => {
        var [x, y, k] = qi,
            max = g(A, x, y),
            res, tmpA;
        for (let kx = 0; kx < k; kx++) {
            for (let ka = 0; ka < n; ka++) {
                tmpA = A.slice();
                tmpA[ka] = 1 - tmpA[ka];
                res = g(tmpA, x, y);
                max = max < res ? res : max;
            }
        }
        console.log(max);
    });
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});