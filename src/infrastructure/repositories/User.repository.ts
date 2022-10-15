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

    update(user: UserEntity): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<UserEntity[]> {
        throw new Error("Method not implemented.");
    }
    findOne(filter: Partial<UserEntity>): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    findMany(filter: Partial<UserEntity>): Promise<UserEntity[]> {
        throw new Error("Method not implemented.");
    }
}