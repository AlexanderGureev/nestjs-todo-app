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
  UseGuards,
  Req,
} from "@nestjs/common";
import { ITodoService } from "../../interfaces";
import { TODO_SERVICE_PROVIDER } from "../constans";
import { TodoDto, IdDto, LimitDto } from "./todo.dto";
import { ParseToIntPipe } from "../../pipes/validation.pipe";
import { ApiResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthGuard } from "../../guards/auth.guard";

@ApiUseTags("todos")
@Controller("todos")
@UseGuards(AuthGuard)
export class TodoController {
  constructor(
    @Inject(TODO_SERVICE_PROVIDER) private readonly appService: ITodoService,
  ) {}

  @ApiResponse({
    status: 201,
    description: "The todo has been successfully created.",
  })
  @ApiResponse({
    status: 400,
    description: "Validation failed.",
  })
  @ApiResponse({ status: 403, description: "Authorization required." })
  @Post()
  @UsePipes(ValidationPipe)
  async createTodo(@Body() todo: TodoDto) {
    return await this.appService.createTodo(todo);
  }

  @ApiResponse({
    status: 200,
    description: "List of all todos.",
  })
  @ApiResponse({
    status: 204,
    description: "Todo list is empty.",
  })
  @ApiResponse({
    status: 400,
    description: "Validation failed.",
  })
  @ApiResponse({ status: 403, description: "Authorization required." })
  @Get()
  async getAllTodos(
    @Res() res,
    @Query(new ParseToIntPipe({ isOptional: true }), new ValidationPipe())
    { limit }: LimitDto,
  ) {
    const todos = await this.appService.getAllTodos(limit);
    if (!todos.length) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    return res.status(HttpStatus.OK).json(todos);
  }

  @ApiResponse({
    status: 200,
    description: "Todo by id.",
  })
  @ApiResponse({
    status: 404,
    description: "Todo for this ID do not exist.",
  })
  @ApiResponse({
    status: 400,
    description: "Validation failed.",
  })
  @ApiResponse({ status: 403, description: "Authorization required." })
  @Get(":id")
  @UsePipes(ValidationPipe)
  async getTodoById(@Param() { id }: IdDto, @Res() res) {
    const todo = await this.appService.getTodoById(id);
    if (!todo) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    return res.status(HttpStatus.OK).json(todo);
  }

  @ApiResponse({
    status: 201,
    description: "Updated todo by id.",
  })
  @ApiResponse({
    status: 404,
    description: "Todo for this ID do not exist.",
  })
  @ApiResponse({
    status: 400,
    description: "Validation failed.",
  })
  @ApiResponse({ status: 403, description: "Authorization required." })
  @Put(":id")
  @UsePipes(ValidationPipe)
  async updateTodoById(
    @Param() { id }: IdDto,
    @Body() todo: TodoDto,
    @Res() res,
  ) {
    const updatedTodo = await this.appService.updateTodoById(id, todo);
    if (!updatedTodo) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    return res.status(HttpStatus.CREATED).json(updatedTodo);
  }

  @ApiResponse({
    status: 201,
    description: "Deleted todo by id.",
  })
  @ApiResponse({
    status: 404,
    description: "Todo for this ID do not exist.",
  })
  @ApiResponse({
    status: 400,
    description: "Validation failed.",
  })
  @ApiResponse({ status: 403, description: "Authorization required." })
  @Delete(":id")
  @UsePipes(ValidationPipe)
  async deleteTodoById(@Param() { id }: IdDto, @Res() res) {
    const deletedTodo = await this.appService.deleteTodoById(id);
    if (!deletedTodo) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    return res.status(HttpStatus.OK).json(deletedTodo);
  }
}
