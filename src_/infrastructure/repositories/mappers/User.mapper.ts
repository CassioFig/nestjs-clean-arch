import { User as PrismaUser, UserTypes as PrismaUserTypes } from '@prisma/client'
import { User, UserEntity } from "@domain/entities";
import { UserTypes } from "@domain/enums";
import { Mapper } from "./Mapper";

type UserPersistence = PrismaUser

export class UserMapper extends Mapper<UserEntity, UserPersistence> {
    toDomain (persistence: UserPersistence): UserEntity {
        return new User({
            ...persistence,
            type: persistence.type as UserTypes
        })
    }
    
    toPersistence (domain: UserEntity | Partial<UserEntity>): UserPersistence {
        return {
            id        : domain.id,
            name      : domain.name,
            email     : domain.email,
            password  : domain.password,
            type      : PrismaUserTypes[domain.type],
            createdAt : domain.createdAt,
            updatedAt : domain.updatedAt
        }
    }

    toDomainList (persistence: UserPersistence[]): UserEntity[] {
        return persistence.map(this.toDomain)
    }

    toPersistenceList (domain: UserEntity[]): UserPersistence[] {
        return domain.map(this.toPersistence)
    }

}