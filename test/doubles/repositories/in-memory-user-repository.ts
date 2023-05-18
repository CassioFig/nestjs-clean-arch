import { UserRepository } from "@domain/interfaces";
import { UserEntity } from "@domain/entities";

export class InMemoryUserRepository implements UserRepository {
    private readonly _users: UserEntity[] = [];
    private _idCounter: number = 0;

    constructor (users: UserEntity[]) { this._users = users;}

    get users (): UserEntity[] { return this._users; }

    async create (user: UserEntity): Promise<UserEntity> {
        user.id = (++this._idCounter).toString();
        this._users.push(user);
        return user;
    }

    async findByEmail (email: string): Promise<UserEntity> {
        return this._users.find(user => user.email === email) || null;
    }

    async findById (id: string): Promise<UserEntity> {
        return this._users.find(user => user.id === id) || null;
    }
}