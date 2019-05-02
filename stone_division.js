const _ = require('lodash');
const BigNumber = require('bignumber.js');

function processData(input) {
    input = _.map(_.split(input, "\n"), line => _.split(line, ' '));
    let n = new BigNumber(input[0][0]);
    let s = _.map(input[1], numStr => ({s: new BigNumber(numStr), odd: (parseInt(numStr.slice(-1)) % 2) === 1}));
    s.sort(function (a, b) {
      if (a.s.lessThan(b.s)) {
        return 1;
      }
      if (a.s.greaterThan(b.s)) {
        return -1;
      }
      return 0;
    });
    //console.log(s);
    if (isFirstWinning(n, s, true)) {
        console.log('First');
    } else {
        console.log('Second');
    }
}
function isFirstWinning(n, s, firstPlayersTurn) {
    let divsInitial = _.map(s, si => n.div(si.s));
    let divs = [];
    s = _.filter(s, (si, key) => {
        if (divsInitial[key].isInt()) {
            divs.push(divsInitial[key]);
            return true;
        } else return false;
    });
    //console.log('isFirstWinning', n.toString(), _.map(s, si => si.s.toString()), firstPlayersTurn);
    for (let i = 0; i < s.length; i++) {
        let firstWinning = isFirstWinning(divs[i], s, !firstPlayersTurn);
        if ((firstPlayersTurn && firstWinning) || (!firstPlayersTurn && !firstWinning)) {
            //console.log(firstWinning, n.toString(), s[i].s.toString(), firstPlayersTurn, s[i].odd);
            return firstPlayersTurn && s[i].odd;
        }
    }
    //console.log('END', n.toString(), !firstPlayersTurn);
    return !firstPlayersTurn;
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