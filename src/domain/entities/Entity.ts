export abstract class Entity {
    id?        : string
    createdAt? : Date
    updatedAt? : Date

    constructor (entity: Entity) {
        this.id        = entity.id
        this.createdAt = entity.createdAt
        this.updatedAt = entity.updatedAt
    }

    setUpdateAt () { this.updatedAt = new Date() }
}