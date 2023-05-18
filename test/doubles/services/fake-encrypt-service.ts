import { EncryptService } from "@domain/interfaces";

export class FakeEncryptService implements EncryptService {
    encrypt(value: string): string {
        return value + 'ENCRYPTED';
    }

    compare(value: string, hash: string): boolean {
        return value + 'ENCRYPTED' === hash;
    }
}