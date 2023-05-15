export interface EncryptService {
    encrypt (value: string): string;
    compare (value: string, hash: string): boolean | Promise<boolean>;
}