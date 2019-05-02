function processData(input) {
    var args = input.split('\n');
    var n = Number(args[0]);
    var arr = args[1].split(' ').map(Number);
    
    function findExpression(prev, index){
        if(index == n){
           if(prev % 101 == 0){
               return "";
           } else {
               return null;
           }
        }
        for(var i = 0; i < 3; i++){
            if(i == 0){
                var curr = (prev * arr[index]) % 101;
                var retVal = findExpression(curr, index+1);
                if(retVal != null){
                    retVal = "*" + arr[index] + retVal;
                    return retVal;
                }
                
            }
            if(i == 1){
               var curr = (prev + arr[index]) % 101;
               var retVal = findExpression(curr, index+1);
               if(retVal != null){
                    retVal = "+" + arr[index] + retVal;
                    return retVal
               }
            }
            if(i == 2){
              
                 var curr = (prev - arr[index]) % 101;
                var retVal = findExpression(curr, index+1);
                if(retVal != null){
                    retVal = "-" + arr[index] + retVal;
                    return retVal;
                }
            }
        }
    }
    
    console.log(arr[0] + findExpression(arr[0], 1));
    
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