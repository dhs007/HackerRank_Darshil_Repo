function processData(data) {
    const stack = [];
    const input = data.split(/[^0-9]/g);
    var count, max, i, inPos = 0;
    count = Number(input[inPos++]);
    while (count--) {
        const command = input[inPos++];
        if (command === "1") { stack[stack.length] = Number(input[inPos++]) }
        else if (command === "2") { stack.pop() }
        else {
            i = stack.length;
            max = stack[--i];
            while (i--) { max = Math.max(max, stack[i]) }
            console.log(max);
        }
    }
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
