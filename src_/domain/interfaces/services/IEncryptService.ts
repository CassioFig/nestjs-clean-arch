export interface IEncryptService {
    encrypt (value: string): string;
    compareValues (value: string, hashedValue: string): boolean | Promise<boolean>;
  }