/// <reference types="mongoose" />
import { IConnection } from "../../interfaces";
import { TodoService } from "./todo.service";
export declare const providers: ({
    provide: string;
    useFactory: (connection: IConnection) => import("mongoose").Model<import("mongoose").Document, {}>;
    inject: string[];
    useClass?: undefined;
} | {
    provide: string;
    useClass: typeof TodoService;
    useFactory?: undefined;
    inject?: undefined;
})[];
