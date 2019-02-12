import { IUser } from "../../interfaces";
export declare class RegisterUserDto implements IUser {
    readonly email: string;
    readonly username: string;
    readonly password: string;
}
export declare class LoginUserDto {
    readonly email: string;
    readonly password: string;
}
