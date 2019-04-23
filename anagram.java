import java.util.Scanner;

public class Solution {

    protected static String getOutput(char[] both) {
        int length = both.length;
        int result = 0;
        if (length % 2 == 0) {
            int[] a = new int[26];
            int[] b = new int[26];
            for (int index = 0; index < length; index++) {
                char character = both[index];
                if (index < length / 2) {
                    a[character - 'a']++;
                } else {
                    b[character - 'a']++;
                }
            }
            for (int index = 0; index < 26; index++) {
                result += Math.abs(a[index] - b[index]);
            }
            result /= 2;
        } else {
            result = -1;
        }
        return Integer.toString(result);
    }

    public static void main(String args[] ) throws Exception {
        Scanner in = new Scanner(System.in);
        int tests = in.nextInt();
        for (int t = 0; t < tests; t++) {
            System.out.println(Solution.getOutput(in.next().toCharArray()));
        }
    }

}