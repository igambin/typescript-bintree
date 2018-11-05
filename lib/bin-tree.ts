interface RecursionFreeBinTree<T> {
    leftChild?: RecursionFreeBinTree<T>;
    rightChild?: RecursionFreeBinTree<T>;
    nodeData: T;
}

export class BinTree<T> {
    private _nodeData: T;
    private _parent?: BinTree<T>;
    private _leftChild?: BinTree<T>;
    private _rightChild?: BinTree<T>;

    private constructor(nodeData: T, parent?: BinTree<T>) {
        this._nodeData = nodeData;
        this._parent = parent;
    }

    //<editor-fold desc="getters and setters">
    get nodeData(): T {
        return this._nodeData;
    }

    set nodeData(value: T) {
        this._nodeData = value;
    }

    get parent(): BinTree<T> | undefined {
        return this._parent;
    }

    set parent(value: BinTree<T> | undefined) {
        this._parent = value;
    }

    get leftChild(): BinTree<T> | undefined {
        return this._leftChild;
    }

    set leftChild(value: BinTree<T> | undefined) {
        this._leftChild = value;
        if (value) {
            value.parent = this;
        }
    }

    get rightChild(): BinTree<T> | undefined {
        return this._rightChild;
    }

    set rightChild(value: BinTree<T> | undefined) {
        this._rightChild = value;
        if (value) {
            value.parent = this;
        }
    }

//</editor-fold>

    public static init<R>(rootData: R): BinTree<R> {
        return new BinTree<R>(rootData);
    }

    public createLeftChild(childData: T): void {
        this._leftChild = new BinTree<T>(childData, this);
    }

    public createRightChild(childData: T): void {
        this._rightChild = new BinTree<T>(childData, this);
    }

    public isRoot(): boolean {
        //return !!this._parent;
        return this._parent === undefined;
    }

    public isLeaf(): boolean {
        //return !(this._leftChild || this._rightChild);
        return this._leftChild === undefined && this._rightChild === undefined;
    }

    public getSubTreeInOrder(): BinTree<T>[] {
        if (this.isLeaf()) {
            return Array.of(this);
        } else {
            const lefts = this._leftChild ? this._leftChild.getSubTreeInOrder() : [];
            const rights = this._rightChild ? this._rightChild.getSubTreeInOrder() : [];
            const root: BinTree<T>[] = [this];
            return lefts.concat(root).concat(rights);
        }
    }

    public getSubTreePreOrder(): BinTree<T>[] {
        if (this.isLeaf()) {
            return [this];
        } else {
            const lefts = this._leftChild ? this._leftChild.getSubTreePreOrder() : [];
            const rights = this._rightChild ? this._rightChild.getSubTreePreOrder() : [];
            const root: BinTree<T>[] = [this];
            return root.concat(lefts).concat(rights);
        }
    }

    public map(fn: (n: T) => T): void {
        this._nodeData = fn(this.nodeData);
        if (this._leftChild) {
            this._leftChild.map(fn);
        }
        if (this._rightChild !== undefined) {
            this._rightChild.map(fn);
        }
    }

    public getSubtreeSize(): number {
        const leftSize = this._leftChild ? this._leftChild.getSubtreeSize() : 0;
        const rightSize = this._rightChild ? this._rightChild.getSubtreeSize() : 0;
        return 1 + leftSize + rightSize;
    }

    public getCurrentDepth(): number {
        let result = 0;
        let parent = this.parent;
        while (parent) {
            result++;
            parent = parent.parent;
        }
        return result;
    }

    public toNonRecursive(): RecursionFreeBinTree<T> {
        const leftChild = this._leftChild ? this._leftChild.toNonRecursive() : undefined;
        const rightChild = this._rightChild ? this._rightChild.toNonRecursive() : undefined;
        return {
            nodeData: this.nodeData,
            leftChild: leftChild,
            rightChild: rightChild
        };
    }

    public static fromNonRecursive<R>(nonRecursive: RecursionFreeBinTree<R>): BinTree<R> {
        const node = new BinTree(nonRecursive.nodeData);
        if (nonRecursive.leftChild) {
            node.leftChild = BinTree.fromNonRecursive(nonRecursive.leftChild);
        }
        if (nonRecursive.rightChild) {
            node.rightChild = BinTree.fromNonRecursive(nonRecursive.rightChild);
        }
        return node;
    }
}