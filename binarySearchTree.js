class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    let removedDuplicateArr = [...new Set(arr)];
    let sortedArr = removedDuplicateArr.sort((a, b) => a - b);
    this.root = buildTree(sortedArr);
  }

  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      node.data = this.findMinValue(node.right);
      node.right = this.deleteItem(node.data, node.right);
    }
    return node;
  }

  find(value) {
    let tmp = this.root;
    if (!tmp) return null;
    if (tmp.data === value) return tmp;
    while (tmp) {
      if (value < tmp.data) {
        tmp = tmp.left;
      } else if (value > tmp.data) {
        tmp = tmp.right;
      } else {
        return tmp;
      }
    }
  }

  levelOrder(callback) {
    if (this.root === null) return [];

    const queue = [this.root];
    const result = [];

    while (queue.length > 0) {
      const node = queue.shift();

      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return callback ? undefined : result;
  }

  inOrder(node = this.root, callback) {
    const result = [];
    function traverseInOrder(node) {
      if (node.left !== null) traverseInOrder(node.left);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      if (node.right !== null) traverseInOrder(node.right);
    }
    traverseInOrder(node);
    return callback ? undefined : result;
  }

  preOrder(node = this.root, callback) {
    const result = [];
    function traversePreOrder(node) {
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      if (node.left !== null) traversePreOrder(node.left, callback);
      if (node.right !== null) traversePreOrder(node.right, callback);
    }
    traversePreOrder(node);
    return callback ? undefined : result;
  }

  postOrder(node = this.root, callback) {
    const result = [];
    function traversePostOrder(node) {
      if (node.left !== null) traversePostOrder(node.left, callback);
      if (node.right !== null) traversePostOrder(node.right, callback);
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
    }
    traversePostOrder(node);
    return callback ? undefined : result;
  }

  height(node = this.root) {
    if (node === null) {
      return 0;
    }
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, current = this.root) {
    if (this.root === null) {
      return -1;
    }
    let depth = 0;

    while (current !== null) {
      if (node.data < current.data) {
        current = current.left;
        depth += 1;
      } else if (node.data > current.data) {
        current = current.right;
        depth += 1;
      } else {
        return depth;
      }
    }
    return -1;
  }
  isBalanced(node = this.root) {
    if (node === null) return true;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    } else {
      return this.isBalanced(node.left) && this.isBalanced(node.right);
    }
  }

  toArray() {
    const result = [];
    this.inOrder(this.root, (node) => result.push(node.data));
    return result;
  }

  rebalance() {
    const nodes = this.toArray();
    this.root = buildTree(nodes);
  }

  findMinValue(node) {
    let minValue = node.data;
    while (node.left !== null) {
      minValue = node.left.data;
      node = node.left;
    }
    return minValue;
  }
}

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) return null;
  let mid = Math.floor((start + end) / 2);

  let node = new Node(
    arr[mid],
    buildTree(arr, start, mid - 1),
    buildTree(arr, mid + 1, end),
  );

  return node;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
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

function randomNumbers(numberAmount) {
  let arr = [];
  for (let i = 0; i < numberAmount; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}
const newTree = new Tree(randomNumbers(57));

prettyPrint(newTree.root);
console.log(newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.preOrder());
console.log(newTree.postOrder());
console.log(newTree.inOrder());
newTree.insert(143);
newTree.insert(256);
newTree.insert(343);
console.log(newTree.isBalanced());
newTree.rebalance();
console.log(newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.preOrder());
console.log(newTree.postOrder());
console.log(newTree.inOrder());
prettyPrint(newTree.root);
