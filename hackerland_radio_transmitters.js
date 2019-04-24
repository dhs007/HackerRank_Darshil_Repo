'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the hackerlandRadioTransmitters function below.
function compareTo(a, b) {
    return a - b;
}
function hackerlandRadioTransmitters(x, k) {

    x = x.sort(compareTo);
    let lower_range = x[0], higher_range, i, j, flag, count = 0;
    for (i = 0; i < x.length;) {
        flag = 0;
        lower_range = x[i];
        higher_range = x[i] + k + k;
        count++;
        for (j = i; j < x.length; j++) {
            if (x[j] > higher_range) {
                flag = 1;
                i = j;
                break;
            }
        }
        if (flag == 0) {
            break;
        }
    }
    return count;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const x = readLine().split(' ').map(xTemp => parseInt(xTemp, 10));

    let result = hackerlandRadioTransmitters(x, k);

    ws.write(result + "\n");

    ws.end();
}
