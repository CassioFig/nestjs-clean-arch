export interface IRepository<TEntity> {
    create (entity: TEntity): Promise<TEntity>
    update (entity: TEntity): Promise<TEntity>
    delete (id: string): Promise<void>
    findById (id: string): Promise<TEntity>
    findAll (): Promise<TEntity[]>
    findOne (filter: Partial<TEntity>): Promise<TEntity>
    findMany (filter: Partial<TEntity>): Promise<TEntity[]>
}