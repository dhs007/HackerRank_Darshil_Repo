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

// Complete the staircase function below.
function staircase(n) {

    let space, i, j;

    for (i = 0; i < n; i++) {
        for (space = i; space < n-1; space++) {
            process.stdout.write(" ");
        }

        for (j = 0; j <= i; j++) {
            process.stdout.write("#");
        } 

        process.stdout.write("\n");
    }
    

}

function main() {
    const n = parseInt(readLine(), 10);

    staircase(n);
}
