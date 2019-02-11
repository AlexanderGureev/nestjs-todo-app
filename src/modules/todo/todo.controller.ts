import { Controller, Get, Inject } from "@nestjs/common";
import { ITodoService } from "../../interfaces";
import { TODO_SERVICE_PROVIDER } from "../constans";

@Controller()
export class TodoController {
  constructor(
    @Inject(TODO_SERVICE_PROVIDER) private readonly appService: ITodoService,
  ) {}

  @Get("/todos")
  async getAllTodos(): Promise<any> {
    return await this.appService.getAllTodos();
  }
}
