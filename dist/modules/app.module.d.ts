import { NestModule, MiddlewareConsumer } from "@nestjs/common";
import { IConfigService } from "src/interfaces";
export declare class AppModule implements NestModule {
    private readonly configService;
    constructor(configService: IConfigService);
    configure(consumer: MiddlewareConsumer): void;
}
