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

// Complete the miniMaxSum function below.
function miniMaxSum(arr) {
    arr = arr.sort();
    let min_sum = 0, max_sum = 0, i;

    for (i = 0; i < arr.length-1; i++) {
        min_sum += arr[i];
    }

    for (i = 1; i < arr.length; i++) {
        max_sum += arr[i];
    }
    console.log(min_sum + " " + max_sum);
}

function main() {
    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
