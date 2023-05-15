import { User as PrismaUser, UserTypes as PrismaUserTypes } from '@prisma/client';
import { User, UserEntity } from '@domain/entities';
import { UserTypes } from '@domain/enums';
import { Mapper } from "./mapper";

type UserPersistence = PrismaUser;

class UserMapper implements Mapper<UserEntity, PrismaUser> {
    toDomain(persistence: UserPersistence): UserEntity {
        return new User({
            ...persistence,
            type: persistence.type as UserTypes
        })
    }

    toPersistence(domain: UserEntity): UserPersistence {
        return {
            id: domain.id,
            name: domain.name,
            email: domain.email,
            password: domain.password,
            type: PrismaUserTypes[domain.type],
            createdAt: domain.createdAt,
            updatedAt: domain.updatedAt
        }
    }

    toDomainArray(persistence: UserPersistence[]): UserEntity[] {
        return persistence.map(user => this.toDomain(user));
    }
    
    toPersistenceArray(domain: UserEntity[]): UserPersistence[] {
        return domain.map(user => this.toPersistence(user));
    }
}

export const userMapper = new UserMapper();