import { NestMiddleware, MiddlewareFunction } from "@nestjs/common";
import { IModel, IUserModel } from "src/interfaces";
export declare class AuthMiddleware implements NestMiddleware {
    private readonly userModel;
    constructor(userModel: IModel<IUserModel>);
    resolve(): Promise<MiddlewareFunction>;
}
