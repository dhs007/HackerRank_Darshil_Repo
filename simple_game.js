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
 * Complete the simpleGame function below.
 */
function simpleGame(n, m, k) {
    const memo = [];
    const G = calcGrundy(n, k, memo);
    console.log(JSON.stringify(G));
    return findCombinations(n, m, G);
}

function findCombinations(n, m, G) {
    let positions = Array(m - 1);
    for (let i = m - 2; i >= 0; i--) {
        positions[i] = n - m + i + 1;
    }
    let sum = 0;
    while (true) {
        sum += getGrundyFromCombination(G, n, m, positions);
        if (sum === 1000000007) {
            sum = 0;
        }
        for (let i = 0; i < m - 1; i++) {
            if (positions[i] > i + 1) {
                positions[i]--;
                for (let j = 0; j < i; j++) {
                    positions[j] = positions[i] - i + j;
                }
                break;
            }
        }

        if (positions[m - 2] === m - 1) {
            sum += getGrundyFromCombination(G, n, m, positions);
            if (sum === 1000000007) {
                sum = 0;
            }
            break;
        }
    }
    return sum;
}

function getGrundyFromCombination(G, n, m, positions) {
    let result = G[positions[0]];
    for (let i = 1; i < m - 1; i++) {
        result ^= G[positions[i] - positions[i - 1]];
    }
    if (m > 1) {
        result ^= G[n - positions[m - 2]];
    }
    if (result !== 0) {
        return 1;
    }
    return 0;
}

function calcGrundy(maxStones, k, memo) {
    let result = [];
    for (let i = 1; i <= maxStones; i++) {
        result[i] = findGrundy(i, k, memo);
    }
    return result;
}

function findGrundy(stones, k, memo) {
    if (stones === 1 || stones === 0) {
        return 0; // P2 wins
    }
    if (k === 2) {
        return stones % 2 === 0 ? 1 : 0;
    }
    if (k >= stones) {
        return stones - 1;
    }
    if (memo[stones] !== undefined) {
        return memo[stones];
    }
    const mex = getMex(stones, k, memo);
    let result = -1;
    mex.sort((a, b) => a - b).some(elem => {
        if (elem === result || elem === result + 1) {
            result = elem;
            return false;
        }
        return true;
    });
    memo[stones] = result + 1;
    return result + 1;
}

function getMex(stones, k, memo) {
    let positions = Array(k - 1);
    positions[0] = stones - 1;
    for (let i = 1; i < k - 1; i++) {
        positions[i] = stones;
    }
    const mex = new Set();
    while (true) {
        mex.add(getLengthFromCombination(stones, positions, k, memo));
        for (let i = 0; i < k - 1; i++) {
            if (positions[i] > i + 1) {
                positions[i]--;
                for (let j = 0; j < i; j++) {
                    positions[j] = positions[i] - i + j;

                }
                break;
            }
        }

        if (positions[k - 2] === k - 1) {
            mex.add(getLengthFromCombination(stones, positions, k, memo));
            break;
        }
    }
    return Array.from(mex);
}

function getLengthFromCombination(stones, positions, k, memo) {
    let result = findGrundy(positions[0], k, memo);
    for (let i = 1; i < positions.length; i++) {
        result ^= findGrundy(positions[i] - positions[i - 1], k, memo);
    }
    result ^= findGrundy(stones - positions[positions.length - 1], k, memo);
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nmk = readLine().split(' ');

    const n = parseInt(nmk[0], 10);

    const m = parseInt(nmk[1], 10);

    const k = parseInt(nmk[2], 10);

    let result = simpleGame(n, m, k);

    ws.write(result + "\n");

    ws.end();
}