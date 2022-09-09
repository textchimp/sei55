console.log('DOM traverse main.js loaded');


const traverseDOMIterative = (node) => {
  // print out node, and print all child
  // nodes, and child-child nodes etc
  // NO RECURSION ALLOWED

};


const traverseDOMRecursive = (node) => {

  console.log(node.nodeName, node.className);

  // Loop through every child node (while or forEach method is ok here)
  // but use a recursive call to process them

}; // traverseDOMRecursive


// To run them:
traverseDOMIterative( document.body );
// traverseDOMRecursive( document.body );
