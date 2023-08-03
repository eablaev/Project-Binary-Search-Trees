export class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }   
}

export class Tree {
    constructor(arr) {
        this.root = null;
    }
    buildTree(arr) {
        //remove duplicates
        var noDupArr = removeDup(arr);
        //sort
        var sortedArr = mergeSort(noDupArr);
        //built tree
        var tree = arrayToBST(sortedArr,0,sortedArr.length-1);
        console.log(tree)
        this.root = tree;
        return tree;
    }
    insertNode(data,node) { 
        if(!node) {
            return new Node(data)
        }
        if(data > node.data) {
            node.right = this.insertNode(data,node.right)
        } else if(data < node.data) {
            node.left = this.insertNode(data,node.left)
        } 
    
        return node 
    }
    deleteNode(data,node) {
        if(!node) {
            return null
        }
        if(data > node.data) {
           node.right = this.deleteNode(data,node.right);
           console.log('right')
        } else if(data < node.data) {
            node.left = this.deleteNode(data,node.left);
            console.log('left')
        } else {
            console.log('found element')
            if(!node.left && !node.right) {
                //1.case 1: if no children
                return null;
            } else if(!node.left) {
                //1.case 2: if 1 child 
                return node.right    
            } else if(!node.right) {
                return node.left;
            } else {
                //1.case 3: if 2 children 
                var minNode = findMinNode(node.right);

                node.data = minNode.data;
                //delete node from its original position 
                node.right = this.deleteNode(minNode.data,node.right)
            }
            
        }
        return node
    }
    find(data,currentNode = this.root) {
        
        if (!currentNode) {
            // If the current node is null (reached the end of the tree) or the value is not found, return null.
            return null;
        }
        if(data === currentNode.data) {
            return currentNode
        }
        if(data > currentNode.data) {
            currentNode = currentNode.right;
            return this.find(data,currentNode);
        }else if(data < currentNode.data) {
            currentNode = currentNode.left;
            return this.find(data,currentNode);
        }

    }
}
export function reBalance(node) {
    if(isBalanced(node)) return node;
    
    var nodesArray = inOrder(node);
    let array =[];
    
    nodesArray.forEach(node => array.push(node.data));
  
    return new Tree(array)
}
export function isBalanced(node) {
    if(!node) return true;

    const leftHeight = treeHeight(node.left);
    const rightHeight = treeHeight(node.right);

    
    if(Math.abs(leftHeight - rightHeight) > 1) return false;
    
    return isBalanced(node.right) && isBalanced(node.left);
}
export function levelOrder(node,callback = null) {
    var result = [];
    if(node === null) return 
    var queue = [];
    queue.push(node)
    while(queue.length !== 0) {
      var currentNode = queue.shift();
      if(callback === null) {
         result.push(currentNode);
      } else {
         callback(currentNode)
      }
      if(currentNode.left) {
         queue.push(currentNode.left);  
      } 
      if(currentNode.right) {
         queue.push(currentNode.right)
      }
    }
    if(callback === null) {
     console.log(result)
     return result
    }      
 }
export function inOrder(node,callback = null, result = []) {
    if(node === null) return;
    inOrder(node.left,callback,result);
    if(callback === null) {
        result.push(node);
    } else {
        callback(node);
    }
    inOrder(node.right,callback,result)
       
    return result;
}
export function preOrder(node, callback = null, result = []) {
    if(node === null) return;
    if(callback === null) {
        result.push(node);
    } else {
        callback(node);
    }
    preOrder(node.left,callback,result);
    preOrder(node.right,callback,result);
    return result
}
export function postOrder(node,callback = null, result = []) {
    if(node === null) return;
    postOrder(node.left,callback,result);
    postOrder(node.right,callback,result)
    if(callback === null) {
        result.push(node)
    } else {
        callback(node)
    }
    return result
}
function height(root,searchNode) {
    if(searchNode === null) {
        return 
    }
    console.log("root.data: "+root.data)
    console.log("searchNode.data: "+searchNode.data)
    
    if(!root) return -1;
    if(root.data === searchNode.data) {
        console.log('STOP root.data === searchNode.data')
      return 0 
    }
    if(root.data < searchNode.data) {
        console.log('root.data < searchNode.data')
        return 1 + height(root.right,searchNode)
    } else {
        console.log('root.data > searchNode.data')
        return 1 + height(root.left,searchNode)
    }

}
function treeHeight(node) {
    if (!node) return -1;

    const leftHeight = treeHeight(node.left);
    const rightHeight = treeHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
}
export function findMinNode(node) {
    while(node.left) {
        node = node.left
    }
    return node
}

function arrayToBST(arr,start,end) {
    //base case 
    if(start > end) {
        return null;
    }
    var mid = Math.ceil((start+end) / 2);
    // console.log('mid is: '+arr[mid])
    var node = new Node(arr[mid]);

    node.left = arrayToBST(arr,start,mid-1);
    node.right = arrayToBST(arr,mid+1,end);

    return node;
}
function mergeSort(arr) {
    if(arr.length <= 1) {
        return arr
    }
    let mid  = Math.floor(arr.length/2);
    let a = arr.slice(0,mid);
    let b = arr.slice(mid);   
    // console.log('a is: '+a+" and b is: "+b)
    return sort(mergeSort(a),mergeSort(b))
}
function sort(a,b) {
    // console.log('inside sort : a is: '+a+" and b is: "+b)
    let i = 0;
    let j = 0;
    let k = 0;

    let c = [];

    while(i < a.length && j < b.length) {
        if(a[i] < b[j]) {
           c[k] =  a[i];
           i++;
        } else if(a[i] > b[j]) {
            c[k] =  b[j];
            j++;
        }
        k++;
    }
    while(j < b.length) {
        c[k] = b[j];
        j++;
        k++;
    }
    while (i < a.length) {
        c[k] = a[i];
        i++;
        k++;
    }
    // console.log('inside sort: sorted is: '+c)
    return c
}
function removeDup(arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
}
export function prettyPrint (node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };








