var gameOver = 0;
var alice = true;

function processData(input) {
    var _input_array = input.split("\n");
    var n = _input_array[0];
    for (var i = 0; i < n; i++) {
        var piles = "";
        var noOfPiles = _input_array[2 * i + 1];
        piles = _input_array[2 * i + 2].split(" ");
        var gameCheck = gameStatus(piles);
        while (gameCheck == 0) {
            var pileIndex = findLowestPile(piles);
            piles = breakPile(piles, pileIndex);
            alice = !alice;
            gameCheck = gameStatus(piles);
        }
        if (alice == true) {
            process.stdout.write("ALICE\n");
        } else {
            process.stdout.write("BOB\n");
        }
    }

}

function gameStatus(piles) {
    var game = 1;
    for (var i = 0; i < piles.length; i++) {
        if (piles[i] > 2) {
            game = 0;
        }
    }
    return game;
}

function findLowestPile(piles) {
    var lowest = 0, lowestIndex = 0;
    for (var i = 0; i < piles.length; i++) {
        if (piles[i] < lowest) {
            lowest = piles[i];
            lowestIndex = i;
        }
    }
    return i;
}

function breakPile(piles, pileIndex) {
    var newPile = "", pileValue = piles[pileIndex], count = 0;
    for (var i = 1; i < piles[pileIndex] / 2; i++) {
        if (pileValue > i) {
            newPile[count] = i;
            count++;
            pileValue = pileValue - i;
        } else if (pileValue != 0 && pileValue < i) {
            newPile[count - 1] += pileValue;
            pileValue = 0;
        }
    }
    piles.splice(piles[pileIndex]);
    piles = piles.concat(newPile);
    return piles;
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


