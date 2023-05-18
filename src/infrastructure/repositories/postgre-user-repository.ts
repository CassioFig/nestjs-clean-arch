import { DatabaseError } from "@infrastructure/errors";
import { UserRepository } from "@domain/interfaces";
import { UserEntity } from "@domain/entities";
import { Repository } from "./repository";
import { userMapper } from "./mappers";

export class PostgreUserRepository extends Repository implements UserRepository {
    private readonly userRepository = this.getRepository('user');

    async create (user: UserEntity): Promise<UserEntity> {
        try {
            const data = userMapper.toPersistence(user);
            const userSaved = await this.userRepository.create({ data });
            return userMapper.toDomain(userSaved);
        } catch(error) {
            throw new DatabaseError(error);
        }
    }

    async findById(id: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findUnique({ where: { id } });
            return userMapper.toDomain(user);
        } catch(error) {
            throw new DatabaseError(error);
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findUnique({ where: { email } });
            return userMapper.toDomain(user);
        } catch(error) {
            throw new DatabaseError(error);
        }
    }
}