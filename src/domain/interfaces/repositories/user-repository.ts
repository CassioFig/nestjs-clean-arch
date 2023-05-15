import { UserEntity } from "@domain/entities";

export interface UserRepository {
    create (input: UserEntity): Promise<UserEntity>
}