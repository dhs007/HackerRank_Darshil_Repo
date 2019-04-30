function processData(input) {
    //Enter your code here
    var inputArray = input.split("\n")
      , testCount = parseInt(inputArray[0]);

    for (var i = 1; i < testCount*3; i=i+3) {
    	var size = parseInt(inputArray[i])
    	  , arr = [];

    	  arr.push(inputArray[i+1].split("").slice(0, size).map(function(elem) { return {"value": parseInt(elem)};}));
    	  arr.push(inputArray[i+2].split("").slice(0, size).map(function(elem) { return {"value": parseInt(elem)};}));

    	var col = 0
    	  , stack = [];
    	while (col < size) {
    		var alive = false;

    		if ((arr[0][col].marked || arr[0][col].value == 1) && (arr[1][col].marked || arr[1][col].value == 1)) {
    			col++;
    			continue;
    		}

    		if (!arr[0][col].marked && arr[0][col].value == 0) {
    			if (!arr[1][col].marked && arr[1][col].value == 0) { // go down for now
    				arr[0][col].marked = true;
    				arr[1][col].marked = true;
    				alive = true;
    				if (col < size-1 && arr[0][col+1].value == 0) { // possible to go right
    					stack.push({"row":0, "col":col});
    				}
    			} else if (col < size-1 && arr[0][col+1].value == 0) { // can only go right
    				arr[0][col].marked = true;
    				arr[0][col+1].marked = true;
    				alive = true;
    			}
    		} 

    		if (!arr[1][col].marked && arr[1][col].value == 0) {
    			if (col < size-1 && !arr[0][col+1].marked && arr[0][col+1].value == 0) { // go up right for now
    				arr[1][col].marked = true;
    				arr[0][col+1].marked = true;
    				alive = true;
    				if (col < size-1 && arr[1][col+1].value == 0) { // possible to go right
    					stack.push({"row":1, "col":col});
    				}
    			} else if (col < size -1 && arr[1][col+1].value == 0) {
    				arr[1][col].marked = true;
    				arr[1][col+1].marked = true;
    				alive = true;
    			}
			}

			if (!alive) {
				if (stack.length == 0) {
					process.stdout.write("NO\n");
                    break;
				}
				var retry = stack.pop();
				for (var k = col; k > retry.col; k--) {
					arr[0][k].marked = false;
					arr[1][k].marked = false;
				}
                if (col < size -1) {
					arr[0][col+1].marked = false;
					arr[1][col+1].marked = false;
				}
				col = retry.col;
				if (retry.row == 0) {
					arr[1][col].marked = false;
					arr[0][col+1].marked = true;
				} else {
					arr[0][col+1].marked = false;
					arr[1][col+1].marked = true;
				}
			} else {
				col++;
			}
    	}

    	if (col == size) {
    		process.stdout.write("YES\n");
    	}
	}
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