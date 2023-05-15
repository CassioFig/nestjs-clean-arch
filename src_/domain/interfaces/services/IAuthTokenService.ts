export interface IAuthTokenService {
    generate<T> (info: IAuthTokenService.Input<T>): string;
    validateToken?<T>(token: string, secret?: string): T;
  }
  
  export namespace IAuthTokenService {
    export type Input<T> = {
      info: Record<keyof T, any>;
      extraOptions?: {
        expiresIn?: string | number,
        secret?   : string,
      }
    }
  }
  