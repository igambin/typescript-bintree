import {BinTree} from "../lib/bin-tree";

test('should create a root with data', () => {
    const bintree: BinTree<string> = BinTree.init('test');
    expect(bintree).toBeDefined();
    expect(bintree.isLeaf()).toBe(true);
    expect(bintree.isRoot()).toBe(true);
});

test('should add left and right child and set current node as parent of them', () => {
    const bintree: BinTree<string> = BinTree.init('test');
    bintree.createLeftChild('leftchild');
    bintree.createRightChild('rightchild');
    const leftChild: BinTree<string> | undefined = bintree.leftChild;
    const rightChild: BinTree<string> = bintree.rightChild as BinTree<string>;
    expect(bintree.isLeaf()).toBe(false);
    expect(leftChild).toBeDefined();
    expect(leftChild ? leftChild.isLeaf() : false).toBe(true);
    expect(rightChild).toBeDefined();
    expect(rightChild.isLeaf()).toBe(true);
    expect(rightChild.parent).toBe(bintree);
});

//Tree
//        1
//    2       3
//  4   5
//In Order: 4 2 5 1 3
//Pre Order: 1 2 4 5 3
test('in order and pre order', () => {
    const bintree: BinTree<number> = BinTree.init(1);
    bintree.createLeftChild(2);
    bintree.createRightChild(3);
    const lc = bintree.leftChild as BinTree<number>;
    lc.createLeftChild(4);
    lc.createRightChild(5);
    const inOrder = bintree.getSubTreeInOrder().map(n => n.nodeData);
    const preOrder = bintree.getSubTreePreOrder().map(n => n.nodeData);
    expect(inOrder).toEqual([4, 2, 5, 1, 3]);
    expect(preOrder).toEqual([1, 2, 4, 5, 3]);
});

test('json stringify should fail on nodes with children', () => {
    const bintree: BinTree<number> = BinTree.init(1);
    bintree.createLeftChild(2);
    bintree.createRightChild(3);
    const fn = () => JSON.stringify(bintree);
    expect(fn).toThrow();
});

test('mapping method should map each node', () => {
    const mappingFn = (x: number) => x * 3;
    const bintree: BinTree<number> = BinTree.init(1);
    bintree.createLeftChild(2);
    bintree.createRightChild(3);
    bintree.map(mappingFn);
    const lc = bintree.leftChild as BinTree<number>;
    const rc = bintree.rightChild as BinTree<number>;
    expect(bintree.nodeData).toEqual(3);
    expect(lc.nodeData).toEqual(6);
    expect(rc.nodeData).toEqual(9);
});

test('corect depth of node', () => {
    const bintree: BinTree<number> = BinTree.init(1);
    bintree.createLeftChild(2);
    bintree.createRightChild(3);
    const lc = bintree.leftChild as BinTree<number>;
    expect(bintree.getCurrentDepth()).toEqual(0);
    expect(lc.getCurrentDepth()).toEqual(1);
});

test('to non recursive should be stringifiable and parsable', () => {
    const bintree: BinTree<number> = BinTree.init(1);
    bintree.createLeftChild(2);
    bintree.createRightChild(3);
    const nonRecursive = bintree.toNonRecursive();
    expect(nonRecursive).toBeDefined();

    const json = JSON.stringify(nonRecursive);
    expect(json).toBeDefined();

    const parsed = JSON.parse(json);
    expect(parsed).toBeDefined();

    const tree = BinTree.fromNonRecursive(parsed) as BinTree<number>;
    expect(tree.nodeData).toEqual(bintree.nodeData);
    const btLc = bintree.leftChild as BinTree<number>;
    const lc = tree.leftChild as BinTree<number>;
    expect(btLc.nodeData).toEqual(lc.nodeData);

    expect(lc.parent).toBe(tree);
});

test('should return the correct subtree size', () => {
    const bintree: BinTree<number> = BinTree.init(1);
    bintree.createLeftChild(2);
    bintree.createRightChild(3);
    const lc = bintree.leftChild as BinTree<number>;
    lc.createLeftChild(4);
    lc.createRightChild(5);

    expect(bintree.getSubtreeSize()).toEqual(5);
});