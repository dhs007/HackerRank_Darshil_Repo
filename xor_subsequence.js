function mode(sequ) {
    // console.log('sequ', sequ);
    let arr = Object.keys(sequ)
        .map(k => [k, sequ[k]])
        .sort((a, b) => b[1] - a[1])
        .splice(0, 1)[0];
    // console.log('arr', arr);
    return `${arr[0]} ${arr[1]}`;
}

function processData(input) {
    const data = input.split('\n');
    const dataLength = data.length;
    let sequence = {};
    let index = 0;
    while (++index < dataLength) {
        let sub = 0;
        for (let z = index; z < dataLength; z++) {
            sub ^= data[z];
            sequence[sub] = ++sequence[sub] || 1;
        }
    }
    console.log(mode(sequence));
}

process.stdin.resume();
process.stdin.setEncoding('ascii');
_input = '';
process.stdin.on('data', function (input) {
    _input += input;
});

process.stdin.on('end', function () {
    processData(_input);
});