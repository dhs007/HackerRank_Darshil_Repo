import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    public static void main(String[] args) {
                try {
                        Scanner s = new Scanner(System.in);
                        String input = s.nextLine();
                        int numBldg = Integer.parseInt(input.split(" ")[0]);
                        int hBldg = Integer.parseInt(input.split(" ")[1]);
                        int loseheight = Integer.parseInt(input.split(" ")[2]);
                        int[][] m = new int[numBldg][hBldg];
                        int[][] result =new int[numBldg][hBldg];
                        for(int i=0 ; i < numBldg ; i++) {
                                String[] inputArr = s.nextLine().split(" ");
                                for(int j=1; j <inputArr.length;j++) {
                                        int index = Integer.parseInt(inputArr[j]);
                                        m[i][index-1]++;

                                }
                        }
                        int globalMax = Integer.MIN_VALUE;
                        for(int i=0; i < hBldg; i++) {
                                for(int j=0; j < numBldg; j++) {
                                        int max = 0;
                                        result[j][i] += m[j][i];
                                        for(int k=0; k < numBldg;k++) {
                                                if(k != j){
                                                        if(i-loseheight >=0){
                                                                int currMax = result[k][i-loseheight];
                                                                if(max < currMax)
                                                                        max = currMax;
                                                        }
                                                } else {
                                                        if(i-1 >=0)
                                                                if(max < result[k][i-1])
                                                                        max = result[k][i-1];
                                                }
                                        }
                                        result[j][i] += max;
                                        if(globalMax < result[j][i])
                                                globalMax = result[j][i];
                                }
                        }
                     
                        System.out.println(globalMax);

                } catch(Exception e){
                        e.printStackTrace();
                }
    }
}