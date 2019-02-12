import { NestMiddleware, MiddlewareFunction } from "@nestjs/common";
export declare class RedisMiddleware implements NestMiddleware {
    private readonly redis;
    constructor(redis: any);
    resolve(): MiddlewareFunction;
}
