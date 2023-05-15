import { UserEntity } from "@domain/entities";
import { IRepository } from "./IRepository";

export interface IUserRepository extends IRepository<UserEntity> {}