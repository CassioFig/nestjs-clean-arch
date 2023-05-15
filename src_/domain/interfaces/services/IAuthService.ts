import { UserEntity } from "@domain/entities";

export interface IAuthService {
    validateUser(email: string, password: string): Promise<UserEntity>
}