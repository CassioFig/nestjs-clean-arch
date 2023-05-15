import { IEncryptService } from "@domain/interfaces";
import * as bcrypt from "bcrypt";

export class BcryptEncryptService implements IEncryptService {
  private readonly SALT = bcrypt.genSaltSync(10);

  encrypt(value: string): string {
    return bcrypt.hashSync(value, this.SALT);
  }

  compareValues(value: string, hashedValue: string): boolean | Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}