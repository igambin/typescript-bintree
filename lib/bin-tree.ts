import { Node } from "./node";
import { ISortable } from "./i-sortable";

export class BinTree<TEntity extends ISortable<TEntity>> {

    public root : Node<TEntity> | null = null;
    private autobalance: boolean;

    constructor(entity: TEntity | TEntity[] | null, autobalance: boolean = false) {
        this.autobalance = autobalance;
        this.add(entity);
    }

    public isAutobalance(value: boolean) {
        this.autobalance = value;
    }

    public add(entity: TEntity | TEntity[] | null): void {
        if(entity === null) return;
        if(Array.isArray(entity))  {
            entity.forEach( (entity: TEntity) => this.addNode(entity) );
        } else {
            this.addNode(entity);
        }
        if(this.autobalance) this.rebalanceTree();
    }

    private addNode(entity: TEntity): void {
        const node = new Node<TEntity>(entity);
        if(this.root === null) {
            this.root = node;
        } else {
            this.insert(this.root, node);
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

    public search(key: string): TEntity | null {
        return this.searchNode(this.root, key);   
    }

    private searchNode(act: Node<TEntity> | null, key: string): TEntity | null {
        if(act === null) return null;
        if(act.key() === key) return act.data;
        if(key < act.key() )  {
            return this.searchNode(act.left, key);
        } else {
            return this.searchNode(act.right, key);
        }
    }

    public getSubTreePreOrder() : TEntity[] {
        const result: TEntity[] = [];
        if(this.root !== null) this.collectDataPreOrder(result, this.root);
        return result;
    }

    private collectDataPreOrder(result: TEntity[], node: Node<TEntity>) {
        if(result === undefined) throw new Error('result should at least be initialized');
        result.push(node.data);
        if(node.left !== null) this.collectDataPreOrder(result, node.left);
        if(node.right!== null) this.collectDataPreOrder(result, node.right);
    }

    public getSubTreePostOrder() : TEntity[] {
        const result: TEntity[] = [];
        if(this.root !== null) this.collectDataPostOrder(result, this.root);
        return result;
    }

    private collectDataPostOrder(result: TEntity[], node: Node<TEntity>) {
        if(result === undefined) throw new Error('result should at least be initialized');
        if(node.left !== null) this.collectDataPostOrder(result, node.left);
        if(node.right!== null) this.collectDataPostOrder(result, node.right);
        result.push(node.data);
    }

    public getSubTreeByDepth() : TEntity[] {
        const preresult: TEntity[][] = [];
        if(this.root !== null) this.collectDataByDepth(preresult, this.root);
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
        if(this.root !== null) this.collectDataInOrder(result, this.root);
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
        if(this.root !== null) this.mapNodes(result, this.root, mapping);  
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

    public rebalanceTree(): void
    {
        let nodes = this.getSubTreeInOrder();
        this.root = null;
        this.rebalanceNodes(nodes);
    }

    private rebalanceNodes(right: TEntity[]) : void
    {
        if(right.length === 0) return;
        let left: TEntity[] = right.splice(0, Math.ceil(right.length / 2));
        let next: TEntity   = <TEntity> (left.length > right.length ?  left.pop() : right.shift());
        this.addNode(next);
        this.rebalanceNodes(left);
        this.rebalanceNodes(right);
    }
}


