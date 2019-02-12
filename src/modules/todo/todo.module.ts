import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { providers } from "./todo.provider";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [...providers],
})
export class TodoModule {}
