import { IAuthService } from "../../interfaces";
import { RegisterUserDto, LoginUserDto } from "./auth.dto";
export declare class AuthController {
    private readonly authService;
    private readonly sessionOptions;
    constructor(authService: IAuthService);
    login({ email, password }: LoginUserDto, req: any, res: any): Promise<any>;
    register(user: RegisterUserDto, req: any, res: any): Promise<any>;
    logout(req: any, res: any): Promise<any>;
    private createSession;
    private deleteSession;
}
