import { UserEntity } from "@domain/entities";

export interface UserRepository {
    create (input: UserEntity): Promise<UserEntity>;
    findById (id: string): Promise<UserEntity>;
    findByEmail (email: string): Promise<UserEntity>;
}