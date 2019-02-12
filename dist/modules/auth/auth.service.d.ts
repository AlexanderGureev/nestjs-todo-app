import { IUserModel, IAuthService, IUser, IModel } from "src/interfaces";
export declare class AuthService implements IAuthService {
    private readonly userModel;
    constructor(userModel: IModel<IUserModel>);
    login(email: string, password: string): Promise<any>;
    register(user: IUser): Promise<any>;
}
