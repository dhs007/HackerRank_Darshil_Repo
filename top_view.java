import java.util.*;
import java.io.*;

class Node {
    Node left;
    Node right;
    int data;
    
    Node(int data) {
        this.data = data;
        left = null;
        right = null;
    }
}

class Solution {

	/* 
    
    class Node 
    	int data;
    	Node left;
    	Node right;
	*/
public static void topView(Node root) {

    if(root != null) {

        top_view(root.left, true);

        System.out.print(root.data + " ");

        top_view(root.right, false);

    }

}
public static void top_view(Node node, boolean goLeft) {

    if(node != null) {
        if(goLeft) {
            top_view(node.left, goLeft);
            System.out.print(node.data + " ");
        } else {
            System.out.print(node.data + " ");
            top_view(node.right, goLeft);
        }
    } 

}
	public static Node insert(Node root, int data) {