import { UserTypes } from "@domain/enums";

export type TUserToken = {
    userId : string;
    email  : string;
    type   : UserTypes; 
}