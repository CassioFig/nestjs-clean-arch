export interface Mapper<Domain, Persistence> {
    toDomain (data: Persistence): Domain
    toPersistence (data: Domain): Persistence
    toDomainArray (data: Persistence[]): Domain[]
    toPersistenceArray (data: Domain[]): Persistence[]
}