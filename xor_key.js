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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the xorKey function below.
 */
function xorKey(x, queries) {
    return queries.map(querie => {
        let result = 0;
        for (let index = querie[1] - 1; index <= querie[2] -1; index++) {
            let tempResult = x[index] ^ querie[0];

            if(tempResult > result){
                result = tempResult;
            }
        }
        return result;
    });
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const nq = readLine().split(' ');

        const n = parseInt(nq[0], 10);

        const q = parseInt(nq[1], 10);

        const x = readLine().split(' ').map(xTemp => parseInt(xTemp, 10));

        let queries = Array(q);

        for (let queriesRowItr = 0; queriesRowItr < q; queriesRowItr++) {
            queries[queriesRowItr] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
        }

        let result = xorKey(x, queries);

        ws.write(result.join("\n") + "\n");
    }

    ws.end();
}