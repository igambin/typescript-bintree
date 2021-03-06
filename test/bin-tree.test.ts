import {BinTree} from "../lib/bin-tree";
import {User} from "../lib/user";
import {IUser} from "../lib/i-user";
import {Node} from "../lib/node";

const Tom10 = new User('Tom', 10);
const Tom20 = new User('Tom', 20);
const Tom30 = new User('Tom', 30);
const Tom40 = new User('Tom', 40);
const Tom50 = new User('Tom', 50);
const Tom60 = new User('Tom', 60);
const Tom70 = new User('Tom', 70);

test('binary tree can be created', () => {
    const bintree: BinTree<User> = new BinTree<User>(Tom10);
    expect(bintree).toBeTruthy();
});

test('single root node should be leaf AND root', () => {
    const bintree: BinTree<User> = new BinTree<User>(Tom20);
    expect(bintree && bintree.root).toBeTruthy();
    if(bintree.root) {
        expect(bintree.root.isLeaf()).toBe(true);
        expect(bintree.root.isRoot()).toBe(true);
    }
});

test('user contained in tree will be found', () => {
    //Tree
    //        4
    //    2       5
    //  1   3
    const bintree: BinTree<User> = new BinTree<User>([Tom40, Tom20, Tom50, Tom10, Tom30]);
    let user: User | null = bintree.search('Tom30');
    expect(user).toBe(Tom30);
});

test('user NOT contained in tree will NOT be found', () => {
    //Tree
    //        4
    //    2       5
    //  1   3
    const bintree: BinTree<User> = new BinTree<User>([Tom40, Tom20, Tom50, Tom10, Tom30]);
    let user: User | null = bintree.search('Tom60');
    expect(user).toBeNull();
});

test('root with one child node should NOT be leaf, wheras child should NOT be root', () => {
    const bintree: BinTree<User> = new BinTree<User>([Tom20, Tom10]);
    expect(bintree && bintree.root && bintree.root.left).toBeTruthy();
    if(bintree.root && bintree.root.left) {
        expect(bintree.root.isLeaf()).toBe(false);
        expect(bintree.root.left.isRoot()).toBe(false);
    }
});

test('should add left and right child and set current node as parent of them', () => {
    const bintree: BinTree<User> = new BinTree<User>(Tom20);
    bintree.add([Tom10, Tom30]);
    const rootNode:   Node<User> | null = bintree.root;
    const leftChild:  Node<User> | null = rootNode ? rootNode.left : null;
    const rightChild: Node<User> | null = rootNode ? rootNode.right : null;
    expect(rootNode && leftChild && rightChild).toBeTruthy();
    if(rootNode && leftChild && rightChild) {
        expect(rootNode.isLeaf()).toBe(false);
        expect(leftChild.isLeaf()).toBe(true);
        expect(rightChild.isLeaf()).toBe(true);
        expect(leftChild.parent).toBe(rootNode);
        expect(rightChild.parent).toBe(rootNode);
    }
});

test('get nodes "in order"', () => {
    //Tree
    //        4
    //    2       5
    //  1   3
    const bintree: BinTree<User> = new BinTree<User>([Tom40, Tom20, Tom50, Tom10, Tom30]);
    const inOrder = bintree.getSubTreeInOrder().map(n => n.key());
    expect(inOrder).toEqual(['Tom10','Tom20','Tom30','Tom40','Tom50']);
});

test('get nodes "pre order"', () => {
    //Tree
    //        4
    //    2       5
    //  1   3
    const bintree: BinTree<User> = new BinTree<User>([Tom40, Tom20, Tom50, Tom10, Tom30]);
    const preOrder = bintree.getSubTreePreOrder().map(n => n.key());
    expect(preOrder).toEqual(['Tom40','Tom20','Tom10','Tom30','Tom50']);
});

test('get nodes "post order"', () => {
    //Tree
    //        4
    //    2       5
    //  1   3
    const bintree: BinTree<User> = new BinTree<User>([Tom40, Tom20, Tom50, Tom10, Tom30]);
    const preOrder = bintree.getSubTreePostOrder().map(n => n.key());
    expect(preOrder).toEqual(['Tom10','Tom30','Tom20','Tom50','Tom40']);
});

test('get nodes "by depth"', () => {
    //Tree
    //        4
    //    2       5
    //  1   3
    const bintree: BinTree<User> = new BinTree<User>([Tom40, Tom20, Tom50, Tom10, Tom30]);
    const bydepth = bintree.getSubTreeByDepth().map(n => n.key());
    expect(bydepth).toEqual(['Tom40','Tom20','Tom50','Tom10','Tom30']);
});

test('rebalancing a tree should ... well... rebalance the tree', () => {
    // unbalanced Tree      ==>      balanced Tree
    //              7                       4
    //            6                     2       6
    //          5                     1   3   5   7
    //        4
    //      3
    //    2
    //  1
    const bintree: BinTree<User> = new BinTree<User>([Tom70, Tom60, Tom50, Tom40, Tom30, Tom20, Tom10]);
    bintree.rebalanceTree();
    const bydepth = bintree.getSubTreeByDepth().map(n => n.key());
    expect(bydepth).toEqual(['Tom40','Tom20','Tom60','Tom10','Tom30','Tom50','Tom70']);
});

test('autobalanced tree should always be balanced', () => {
    const bintree: BinTree<User> = new BinTree<User>(Tom70, true);
    // unbalanced Tree  ==>     balanced Tree
    //         7                       7
    let bydepth = bintree.getSubTreeByDepth().map(n => n.key());
    expect(bydepth).toEqual(['Tom70']);

    bintree.add(Tom60);
    // unbalanced Tree  ==>     balanced Tree
    //         7                       7
    //       6                     6       
    bydepth = bintree.getSubTreeByDepth().map(n => n.key());
    expect(bydepth).toEqual(['Tom70','Tom60']);

    bintree.add(Tom50);
    // unbalanced Tree  ==>     balanced Tree
    //         7                       6
    //       6                     5       7
    //     5                     
    bydepth = bintree.getSubTreeByDepth().map(n => n.key());
    expect(bydepth).toEqual(['Tom60','Tom50','Tom70']);

    bintree.add([Tom40, Tom30, Tom20, Tom10]);
    // unbalanced Tree    ==>     balanced Tree
    //            6                      4
    //          5   7                2       6
    //        4                    1   3   5   7
    //      3                     
    //    2                     
    //  1                     
    bydepth = bintree.getSubTreeByDepth().map(n => n.key());
    expect(bydepth).toEqual(['Tom40','Tom20','Tom60','Tom10','Tom30','Tom50','Tom70']);
});

test('json stringify should fail on nodes with children', () => {
    const bintree: BinTree<User> = new BinTree<User>(Tom10);
    bintree.add(Tom30);
    const fn = () => JSON.stringify(bintree);
    expect(fn).toThrow();
});

test('mapping method should map each node', () => {
    const bintree: BinTree<User> = new BinTree<User>([Tom20, Tom10, Tom30 ]);
    const result = bintree.map((x: User) => `${x.name}${x.age * 3}`);
    expect(result).toEqual(['Tom30','Tom60','Tom90']);
});

test('correct depth of node', () => {
    const bintree: BinTree<User> = new BinTree<User>([Tom30, Tom20, Tom10 ]);
    expect(bintree && bintree.root && bintree.root.left && bintree.root.left.left).toBeTruthy();
    if(bintree && bintree.root && bintree.root.left && bintree.root.left.left) {
        expect(bintree.root.getCurrentDepth()).toEqual(0);
        expect(bintree.root.left.getCurrentDepth()).toEqual(1);
        expect(bintree.root.left.left.getCurrentDepth()).toEqual(2);
    }
});

test('should return the correct subtree size', () => {
    //Tree
    //        4
    //    2       5
    //  1   3
    const bintree: BinTree<User> = new BinTree<User>([Tom40, Tom20, Tom50, Tom10, Tom30]);
    if(bintree !== null && bintree.root !== null)
    expect(bintree.root.getSubtreeSize()).toEqual(5);
});

test('serializeAsJSONArray/parseFromJSONArray should return a string that can be parsed back into a bintree', () => {
    //Tree
    //        4
    //    2       5
    //  1   3
    const nodes = [Tom40, Tom20, Tom50, Tom10, Tom30];
    const bintree: BinTree<User> = new BinTree<User>(nodes);
    const json: string = bintree.serializeAsJSONArray();
    expect(json).toEqual(JSON.stringify(nodes));
    const clonedTree = BinTree.parseFromJSONArray<User>(json, (data: IUser) => new User(data.name, data.age));
    expect(clonedTree).toBeDefined();
    expect(clonedTree.getSubTreeInOrder()).toEqual(bintree.getSubTreeInOrder());
    expect(bintree && bintree.root && bintree.root.left && bintree.root.left.left).toBeTruthy();
    expect(clonedTree && clonedTree.root && clonedTree.root.left && clonedTree.root.left.left).toBeTruthy();
    if(     bintree     && bintree.root     && bintree.root.left    && bintree.root.left.left
        &&  clonedTree  && clonedTree.root  && clonedTree.root.left && clonedTree.root.left.left) {
        expect(bintree.root.left.left.getCurrentDepth()).toEqual(clonedTree.root.left.left.getCurrentDepth());
    }
});

