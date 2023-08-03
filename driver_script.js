import { Node, Tree, isBalanced, levelOrder, preOrder, postOrder, inOrder, prettyPrint, reBalance } from "./app.js";
function randomArray(elCount,maxEl) {
    var array = []
    while(array.length < elCount) {
        array.push(Math.floor(Math.random() * maxEl));
    }
    return array
}
function balancedCheck(tree) {
    console.log("This is " + (isBalanced(tree.root) ? "a balanced" : "not a balanced") + " tree");
}
function printElements(node) {
    console.log(node)
}

//1.Create a binary search tree from an array of random numbers < 100. 
const randomNumbersArray = randomArray(8,100);
var tree = new Tree();
tree.buildTree(randomNumbersArray)

 //2.Confirm that the tree is balanced by calling isBalanced.
balancedCheck(tree.root);
prettyPrint(tree.root);

//3.Print out all elements in level, pre, post, and in order.
console.log("Level Order: ")
levelOrder(tree.root,printElements);

console.log("Pre Order: ");
preOrder(tree.root,printElements);

console.log("Post Order: ");
postOrder(tree.root,printElements);

console.log("In Order: ");
inOrder(tree.root,printElements);
//4.Unbalance the tree by adding several numbers > 100.
console.log('Unbalancing the tree. Adding 100,150,200')
tree.insertNode(100,tree.root);
tree.insertNode(150,tree.root);
tree.insertNode(200,tree.root);
//5.Confirm that the tree is unbalanced by calling isBalanced.
balancedCheck(tree);
prettyPrint(tree.root);
//6.Balance the tree by calling re-balance.
console.log('Re-balancing the tree')
 tree = reBalance(tree.root);
 //7.Confirm that the tree is balanced by calling isBalanced.
 balancedCheck(tree);
 prettyPrint(tree.root);
 //8.Print out all elements in level, pre, post, and in order.
 console.log("Level Order: ")
levelOrder(tree.root,printElements);

console.log("Pre Order: ");
preOrder(tree.root,printElements);

console.log("Post Order: ");
postOrder(tree.root,printElements);

console.log("In Order: ");
inOrder(tree.root,printElements);



