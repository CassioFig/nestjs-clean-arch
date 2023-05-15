export interface IRepository<TEntity> {
    create (entity: TEntity): Promise<TEntity>
    findById (id: string): Promise<TEntity>
    findAll (): Promise<TEntity[]>
    findOne (filter: Partial<TEntity>): Promise<TEntity>
}