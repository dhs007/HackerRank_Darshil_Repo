import java.io.*;
import java.util.*;

public class Solution {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int n = input.nextInt();
        int[] array = new int[n];
        for(int i = 0; i < n; i++)
            array[i] = input.nextInt();
        
        Arrays.sort(array);
        int minAbs = Integer.MAX_VALUE;
        StringBuilder pairs = new StringBuilder("");
        
        for(int i = 0; i < n-1; i++)
        {
            int absDiff;
            
            if((array[i]<0 && array[i+1]<0)||(array[i]>0 && array[i+1]>0))
                absDiff = Math.abs(array[i] - array[i+1]); 
            else
                absDiff = Math.abs(array[i]) + Math.abs(array[i+1]);
            
            if(absDiff < minAbs)
            {
                minAbs = absDiff;
                pairs = new StringBuilder("");
                pairs.append(array[i]+ " " +array[i+1]+" ");
            }
            else if(absDiff == minAbs)
                pairs.append(array[i]+ " " +array[i+1]+" ");
        
        System.out.println(pairs);
    }
}