import { IAuthService, IEncryptService } from "@domain/interfaces";
import { IUserRepository } from "@domain/interfaces/repositories";
import { UserEntity } from "@domain/entities";
import { Inject } from "@nestjs/common";

export class AuthService implements IAuthService {
    constructor(
        @Inject('userRepository') private readonly userRepository : IUserRepository,
        @Inject('encryptService') private readonly encryptService : IEncryptService
    ) {}

    async validateUser(email: string, password: string): Promise<UserEntity> {
        const userSaved      = await this.userRepository.findOne({ email });
        if (!userSaved) return null

        const passwordsMatch = await this.encryptService.compareValues(password, userSaved.password);
        if (passwordsMatch) return userSaved;
        
        return null;
    }
}