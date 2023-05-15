import { PrismaClient } from "@prisma/client";

type Entities<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export abstract class Repository {
    constructor (private readonly connection: PrismaClient = new PrismaClient()) {}

    getRepository (entity: Entities<PrismaClient>) { return this.connection[entity]}
}