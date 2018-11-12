export interface ISortable<TEntity> {
    key() : string;
    compare(to: TEntity) : number;
}

export class BinTree<TEntity extends ISortable<TEntity>> {

    public Root : Node<TEntity> | null = null;

    constructor(entity: TEntity | TEntity[] | null) {
        if(entity === null) return;
        if(Array.isArray(entity))  {
            this.addRange(entity);
        } else {
            this.Root = new Node<TEntity>(entity);
        }
    }

    public addRange(entities: TEntity[]): void {
        entities.forEach( (entity: TEntity) => this.add(entity) );
    }

    public add(entity: TEntity): void {
        const node = new Node<TEntity>(entity);
        if(this.Root === null) {
            this.Root = node;
        } else {
            this.insert(this.Root, node);
        }
    }

    private insert(act: Node<TEntity>, node: Node<TEntity>): void {
        if(node.data.compare(act.data) < 0) {
            if(act.left === null) {
                act.left = node;
                node.parent = act;
            } else {
                this.insert(act.left, node);
            }
        } else {
            if(act.right === null) {
                act.right = node;
                node.parent = act;
            } else {
                this.insert(act.right, node); 
            }
        }
    } 

    public getSubTreePreOrder() : TEntity[] {
        const result: TEntity[] = [];
        if(this.Root !== null) this.collectDataPreOrder(result, this.Root);
        return result;
    }

    private collectDataPreOrder(result: TEntity[], node: Node<TEntity>) {
        if(result === undefined) throw new Error('result should at least be initialized');
        result.push(node.data);
        if(node.left !== null) this.collectDataPreOrder(result, node.left);
        if(node.right!== null) this.collectDataPreOrder(result, node.right);
    }

    public getSubTreeByDepth() : TEntity[] {
        const preresult: TEntity[][] = [];
        if(this.Root !== null) this.collectDataByDepth(preresult, this.Root);
        const result: TEntity[] = [];
        preresult.forEach((row) => row.forEach((data) => result.push(data)));
        return result;
    }

    private collectDataByDepth(result: TEntity[][], node: Node<TEntity>) {
        if(result === undefined) throw new Error('result should at least be initialized');
        if(result[node.getCurrentDepth()] === undefined) 
            result[node.getCurrentDepth()] = [];
        result[node.getCurrentDepth()].push(node.data);
        if(node.left !== null) this.collectDataByDepth(result, node.left);
        if(node.right!== null) this.collectDataByDepth(result, node.right);
    }

    public getSubTreeInOrder() : TEntity[] {
        const result: TEntity[] = [];
        if(this.Root !== null) this.collectDataInOrder(result, this.Root);
        return result;
    }

    private collectDataInOrder(result: TEntity[], node: Node<TEntity>) {
        if(result === undefined) throw new Error('result should at least be initialized');
        if(node.left !== null) this.collectDataInOrder(result, node.left);
        result.push(node.data);
        if(node.right!== null) this.collectDataInOrder(result, node.right);
    }

    public map<TOut>(mapping: (x: TEntity) => TOut) : TOut[] {
        const result : TOut[] = [];
        if(this.Root !== null) this.mapNodes(result, this.Root, mapping);  
        return result;  
    }

    private mapNodes<TOut>(result: TOut[], node: Node<TEntity>, mapping: (x: TEntity) => TOut) {
        if(node.left !== null) this.mapNodes(result, node.left, mapping);
        result.push(mapping(node.data));
        if(node.right!== null) this.mapNodes(result, node.right, mapping);
    }

    public serializeAsJSONArray(): string {
        return JSON.stringify(this.getSubTreeByDepth());
    }

    public static parseFromJSONArray<T extends ISortable<T>>
        (serialized: string, entityFactory: (item: any) => T): BinTree<T> {
            return new BinTree<T>(JSON.parse(serialized).map( (x: T) => entityFactory(x)));
    }
}

export class Node<TEntity extends ISortable<TEntity>> {

    public parent : Node<TEntity> | null = null;
    public left   : Node<TEntity> | null = null;
    public right  : Node<TEntity> | null = null;

    constructor(
        public data: TEntity
        ) {
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
        while(parent !== null) {
            depth++;
            parent = parent.parent;
        }
        return depth;
    }

    public getSubtreeSize(): number {
        let count = 1;
        if(this.left !== null) count += this.left.getSubtreeSize();
        if(this.right !== null) count += this.right.getSubtreeSize();
        return count;
    }
}

export class User implements ISortable<User> {
    public Name : string;
    public Age  : number; 

    constructor(name: string, age: number) {
        this.Name = name;
        this.Age = age;        
    }

    public key() : string {
        return `${this.Name}${this.Age}`;
    }

    public compare(to: User): number {
        if(this.key() < to.key()) { return -1; }
        if(this.key() > to.key()) { return 1; }
        return 0;
    }
}