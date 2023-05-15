import { DatabaseError } from "@infrastructure/errors";
import { UserEntity } from "@domain/entities";
import { Repository } from "./repository";
import { userMapper } from "./mappers";

export class PostgreUserRepository extends Repository implements PostgreUserRepository {
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
}