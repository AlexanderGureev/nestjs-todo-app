/// <reference types="mongoose" />
import { IConnection } from "../../interfaces";
import { AuthService } from "./auth.service";
export declare const providers: ({
    provide: string;
    useFactory: (connection: IConnection) => import("mongoose").Model<import("mongoose").Document, {}>;
    inject: string[];
    useClass?: undefined;
} | {
    provide: string;
    useClass: typeof AuthService;
    useFactory?: undefined;
    inject?: undefined;
})[];
