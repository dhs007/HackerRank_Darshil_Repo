function processData(input) {
    var lines = input.split('\n');
    var line = lines[0].split(" ");
    var n = parseInt(line[0], 10);
    var k = parseInt(line[1], 10);
    var c = lines[1].split(' ').map(function (a) { return parseInt(a, 10); });
    var sum = 0;
    var sumin;

    for (var i = 0; i < n; i++) {
        sum += c[i];
        i += 2 * k;
    }
    sumin = sum;

    for (var j = 1; j <= k; j++) {
        sum = 0;
        for (var i = j; i < n; i++) {
            sum += c[i];
            i += 2 * k;
        }
        if (sum < sumin) sumin = sum;

    }


    console.log(sumin);

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