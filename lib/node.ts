import { ISortable } from "./i-sortable";
export class Node<TEntity extends ISortable<TEntity>> {
    public parent: Node<TEntity> | null = null;
    public left: Node<TEntity> | null = null;
    public right: Node<TEntity> | null = null;
    constructor(public data: TEntity) {
    }
    public key(): string {
        return this.data.key();
    }
    public isRoot(): boolean {
        return this.parent === null;
    }
    public isLeaf(): boolean {
        return this.left === null && this.right === null;
    }
    public getCurrentDepth(): number {
        let depth = 0;
        let parent = this.parent;
        while (parent !== null) {
            depth++;
            parent = parent.parent;
        }
        return depth;
    }
    public getSubtreeSize(): number {
        let count = 1;
        if (this.left !== null)
            count += this.left.getSubtreeSize();
        if (this.right !== null)
            count += this.right.getSubtreeSize();
        return count;
    }
}