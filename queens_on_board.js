process.stdin.setEncoding('ascii');

var _input = "";

process.stdin.on('readable', function (chunk) {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        _input += chunk;
    }
});

process.stdin.on('end', function () {
    if (_input.length > 0) {
        var lines = _input.split('\n');
        consume(lines);
    }
});

function consume(lines) {
    var T = parseInt(lines[0]);

    var index = 1;
    while (T-- > 0) {
        var N = parseInt(lines[index].split(' ')[0]);
        var M = parseInt(lines[index].split(' ')[1]);

        index++;
        var board = new Array(N);
        var bIndex = 0;
        while (N-- > 0) {
            board[bIndex] = new Array(M);
            for (var i = 0; i < M; i++)
                board[bIndex][i] = lines[index][i];
            bIndex++;
            index++;
        }

   
        var solutions = processBoard(board);

        console.log(solutions % 1000000007);
    }
}

Array.prototype.clone = function () {
    var array = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
        if (this[i] instanceof Array) array[i] = this[i].clone();
        else array[i] = this[i];
    }
    return array;
};

function printBoard(board) {
    return;

    for (var row = 0; row < board.length; row++) console.log(board[row]);
    console.log(' ');
}


function processBoard(board) {
    var rows = board.length;
    var cols = board[0].length;
    var solutions = 0;

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            if (board[r][c] == '.') {
                var clone = board.clone();
                placeQueen(clone, r, c);
                solutions++;
                printBoard(clone);
                solutions += processBoard2(clone, r, c + 1);
                //printBoard(clone);
            }
        }
    }

    return solutions;
}

function processBoard2(board, row, col) {
    var rows = board.length;
    var cols = board[0].length;
    var solutions = 0;

    for (var r = row; r < rows; r++) {
        for (var c = col; c < cols; c++) {
            if (board[r][c] == '.') {
                clone = board.clone();
                solutions += processBoard2(clone, r, c + 1);

                placeQueen(board, r, c);
                printBoard(board);
                solutions++;
            }
        }
        col = 0;
    }

    return solutions;
}

function fillRow(board, row) {

    var N = board.length;
    var M = board[0].length; 
    var solutions = 0;

    if (row >= N) return 0;

    var wall = false;
    for (var col = 0; col < M; col++) {
        if (board[row][col] == '.') {
            var clone = board.clone();
            solutions++;
            if (row == N - 1) {
                
            } else {
                placeQueen(clone, row, col);
                solutions += fillRow(clone, row + 1);
            }
        } else if (board[row][col] == '#') {
            wall = true;
        }
    }

    if (wall === true) {
        solutions += fillRow(board.clone(), row + 1);
    }

    return solutions;
}

function placeQueen(board, row, col) {
    var N = board.length; 
    var M = board[0].length; 
    board[row][col] = 'Q';

    for (var c1 = col + 1; c1 < M; c1++) {
        if (board[row][c1] == '#') break;
        board[row][c1] = 'X';
    }

    for (var r1 = row + 1; r1 < N; r1++) {
        if (board[r1][col] == '#') break;
        board[r1][col] = 'X';
    }

    for (var r1 = row + 1, c1 = col + 1; r1 < N && c1 < M; r1++ , c1++) {
        if (board[r1][c1] == '#') break;
        board[r1][c1] = 'X';
    }

    for (var r1 = row + 1, c1 = col - 1; r1 < N && c1 >= 0; r1++ , c1--) {
        if (board[r1][c1] == '#') break;
        board[r1][c1] = 'X';
    }
}
