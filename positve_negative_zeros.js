'use strict';

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

// Complete the plusMinus function below.
function plusMinus(arr) {
    let positives = 0, zeros = 0, negatives = 0, i;

    for (i = 0; i < arr.length; i++) {
        if (arr[i] > 0)
            positives++;
        else if (arr[i] == 0)
            zeros++;
        else
            negatives++;
    }
    console.log(positives / arr.length);
    console.log(negatives / arr.length);
    console.log(zeros / arr.length);

}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
