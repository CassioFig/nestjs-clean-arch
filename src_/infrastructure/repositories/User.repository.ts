import { IUserRepository } from "@domain/interfaces/repositories";
import { DatabaseError } from "@infrastructure/errors";
import { UserEntity } from "@domain/entities";
import { Repository } from "./Repository";
import { UserMapper } from "./mappers";

export class UserRepository extends Repository implements IUserRepository {
    private readonly repository  = this.getRepository('user')
    private readonly userMapper  = new UserMapper()

    async create(user: UserEntity): Promise<UserEntity> {
        try {
            const data = this.userMapper.toPersistence(user)
            const userSaved = await this.repository.create({ data })
            return this.userMapper.toDomain(userSaved)
        } catch (error) {
            throw new DatabaseError(error)
        }
    }

    async findById(id: string): Promise<UserEntity> {
        try {
            const userSaved = await this.repository.findFirst({ where: { id } })
            return userSaved ? this.userMapper.toDomain(userSaved) : null
        } catch (error) {
            throw new DatabaseError(error)
        }
    }
    
    findAll(): Promise<UserEntity[]> {
        throw new Error("Method not implemented.");
    }

    async findOne(filter: Partial<UserEntity>): Promise<UserEntity> {
        try {
            const data = this.userMapper.toPersistence(filter)
            const userSaved = await this.repository.findFirst({ where: { ...data } })
            return userSaved ? this.userMapper.toDomain(userSaved) : null
        } catch (error) {
            throw new DatabaseError(error)
        }
    }
}