import { Module, NestModule, MiddlewareConsumer, Inject } from "@nestjs/common";
import { TodoModule } from "./todo/todo.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { RedisMiddleware } from "../middleware/redis.middleware";
import { AuthMiddleware } from "../middleware/auth.middleware";
import * as cookieParser from "cookie-parser";
import { CONFIG_SEVICE_PROVIDER } from "./constans";
import { IConfigService } from "src/interfaces";
import * as morgan from "morgan";
import * as helmet from "helmet";

@Module({
  imports: [TodoModule, AuthModule, ConfigModule],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(CONFIG_SEVICE_PROVIDER)
    private readonly configService: IConfigService,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        morgan("tiny"),
        helmet(),
        cookieParser(this.configService.get("COOKIE_SECRET")),
        RedisMiddleware,
        AuthMiddleware,
      )
      .forRoutes("auth", "todos");
  }
}
