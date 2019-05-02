function processData(input) {
    //Enter your code here
    input = input.split('\n');
    input = input[1].split(' ');
    var rep = 0;
    if (input.length === 0) {
        console.log(rep);
    }
    while (input.length !== 0) {
        var temp = [];
        var set = {};
        if (input.length > 100000) {
            console.log(-1);
            return;
        }
        for (var i = 0; i < input.length; i++) {
            for (var j = 0; j < input.length; j++) {
                if (input[i] !== input[j]) {
                    var data = Math.abs(input[i] - input[j]);
                    if (set[data] === undefined) {
                        temp.push(data);
                        set[data] = 1;
                    }
                }
            }
        }
        rep += 1;
        input = temp;
    }

    console.log(rep);

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