export interface ISortable<TEntity> {
    key(): string;
    compare(to: TEntity): number;
}