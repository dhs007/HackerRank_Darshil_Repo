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

var getNimber = (function () {
    var nim = [0];
    return function (a) {
        if (a >= nim.length) {
            var next = [];
            for (var i = 0; i <= a / 2; i++) {
                next[getNimber(i) ^ getNimber(a - i - 1)] = 1;
                next[getNimber(i) ^ getNimber(a - i - 2)] = 1;
            }
            nim[a] = next.reduce(function (acc, val, i) {
                return ((acc == i) && val) ? i + 1 : acc;
            }, 0)
        }
        return nim[a];
    }
})()

function isWinning(n, config) {
    var r = config.split("X").map(function (a) { return a.length; });
    return r.reduce(function (acc, x) { return (acc ^ getNimber(x)); }, 0) ? "WIN" : "LOSE";
}

function main() {
    var t = parseInt(readLine());
    for (var a0 = 0; a0 < t; a0++) {
        var n = parseInt(readLine());
        var config = readLine();
        var result = isWinning(n, config);
        process.stdout.write("" + result + "\n");
    }
}