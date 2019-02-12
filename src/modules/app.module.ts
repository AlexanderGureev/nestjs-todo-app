import { Module } from "@nestjs/common";
import { TodoModule } from "./todo/todo.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [TodoModule, AuthModule, ConfigModule],
})
export class AppModule {}
