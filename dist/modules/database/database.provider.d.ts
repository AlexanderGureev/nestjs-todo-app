import { IConfigService } from "../../interfaces";
import * as mongoose from "mongoose";
import * as redis from "redis";
export declare const providers: ({
    provide: string;
    useFactory: (configService: IConfigService) => Promise<typeof mongoose>;
    inject: string[];
} | {
    provide: string;
    useFactory: (configService: IConfigService) => redis.RedisClient;
    inject: string[];
})[];
