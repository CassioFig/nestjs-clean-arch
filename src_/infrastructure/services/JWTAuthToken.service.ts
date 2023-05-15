import { IAuthTokenService } from "@domain/interfaces";
import { sign } from "jsonwebtoken";

export class JWTAuthTokenService implements IAuthTokenService {
    private readonly SECRET = process.env.JWT_SECRET;

    generate<T>({ info, extraOptions }: IAuthTokenService.Input<T>): string {
        const { expiresIn, secret } = extraOptions || {};
        return sign({ ...info  }, secret || this.SECRET, { expiresIn: expiresIn || '1h' });
    }
}