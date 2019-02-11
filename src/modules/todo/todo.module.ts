import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { DatabaseModule } from "../database/database.module";
import { providers } from "./todo.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [...providers],
})
export class TodoModule {}
