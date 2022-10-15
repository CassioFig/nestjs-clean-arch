export abstract class Mapper<D, P> {
    abstract toDomain(persistence: P): D;
    abstract toPersistence(domain: D): P;
    abstract toDomainList (persistence: P[]): D[];
    abstract toPersistenceList (domain: D[]): P[];
}