process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}


function main() {
    var P_temp = readLine().split(' ');
    var P = parseInt(P_temp[0]);
    var Q = parseInt(P_temp[1]);
    var N = 0;
    var M = 0;
    var E = []
    if (Q == 2) {
        while (P > 0) {
            var hub = N;
            var spars = 0
            N++;
            E.push([hub, N]);
            N++;
            M++;
            spars++;
            E.push([hub, N]);
            N++;
            M++;
            spars++;
            E.push([hub, N]);
            N++;
            M++;
            spars++;
            P--;
            while ((spars * (spars - 1) / 2) <= P) {
                P -= (spars * (spars - 1) / 2);
                E.push([hub, N]);
                N++;
                M++;
                spars++;
            }
        }
    } else {
        while (P > 0) {
            var start = N;
            N++;
            for (var j = 1; j < 3 * (Q - 2); j++) {
                E.push([start + j - 1, start + j]);
                M++;
                N++;
            }
            E.push([start + (3 * (Q - 2)) - 1, start]);
            M++;
            var nub = 0;
            while (P > 0 && nub < Q - 2) {
                var spars_0 = 0;
                var spars_1 = 0;
                var spars_2 = 0;
                while (P >= (spars_0 + 1) * (spars_1 + 1) * (spars_2 + 1)) {
                    E.push([start + nub, N]);
                    N++;
                    M++;
                    spars_0++;
                    E.push([start + nub + Q - 2, N]);
                    N++;
                    M++;
                    spars_1++;
                    E.push([start + nub + Q + Q - 4, N]);
                    N++;
                    M++;
                    spars_2++;
                }
                while (P >= (spars_0 + 1) * (spars_1 + 1) * (spars_2)) {
                    E.push([start + nub, N]);
                    N++;
                    M++;
                    spars_0++;
                    E.push([start + nub + Q - 2, N]);
                    N++;
                    M++;
                    spars_1++;
                }
                while (P >= (spars_0 + 1) * (spars_1) * (spars_2)) {
                    E.push([start + nub, N]);
                    N++;
                    M++;
                    spars_0++;
                }
                P -= spars_0 * spars_1 * spars_2
                nub++;
            }
        }
    }
    console.log([N, M].join(' '));
    for (var i = 0; i < M; i++) {
        console.log(E[i].map(x => x + 1).join(' '));
    }
}