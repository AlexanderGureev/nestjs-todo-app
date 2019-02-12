import {
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Res,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { ITodoService } from "../../interfaces";
import { TODO_SERVICE_PROVIDER } from "../constans";
import { TodoDto, IdDto } from "./todo.dto";
import { JoiValidationPipe } from "../../pipes/validation.pipe";
import { limitSchema } from "./schemas";

@Controller("todos")
export class TodoController {
  constructor(
    @Inject(TODO_SERVICE_PROVIDER) private readonly appService: ITodoService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createTodo(@Body() todo: TodoDto) {
    return await this.appService.createTodo(todo);
  }

  @Get()
  @UsePipes(new JoiValidationPipe(limitSchema))
  async getAllTodos(@Res() res, @Query() { limit }) {
    const todos = await this.appService.getAllTodos(limit);
    if (!todos.length) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    return res.status(HttpStatus.OK).json(todos);
  }

  @Get(":id")
  @UsePipes(ValidationPipe)
  async getTodoById(@Param() { id }: IdDto, @Res() res) {
    const todo = await this.appService.getTodoById(id);
    if (!todo) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    return res.status(HttpStatus.OK).json(todo);
  }

  @Put(":id")
  @UsePipes(ValidationPipe)
  async updateTodoById(@Param() { id }: IdDto, @Body() todo: TodoDto) {
    return await this.appService.updateTodoById(id, todo);
  }

  @Delete(":id")
  @UsePipes(ValidationPipe)
  async deleteTodoById(@Param() { id }: IdDto, @Res() res) {
    const deletedTodo = await this.appService.deleteTodoById(id);
    if (!deletedTodo) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    return res.status(HttpStatus.OK).json(deletedTodo);
  }
}
