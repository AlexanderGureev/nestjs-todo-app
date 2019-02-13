import { Injectable, Inject } from "@nestjs/common";
import { IModel, ITodoModel, ITodo } from "../../interfaces";
import { TODO_MODEL_PROVIDER } from "../constans";
import { ITodoService } from "../../interfaces";

@Injectable()
export class TodoService implements ITodoService {
  constructor(
    @Inject(TODO_MODEL_PROVIDER) private readonly todoModel: IModel<ITodoModel>,
  ) {}

  async getAllTodos(limit: number): Promise<ITodo[]> {
    const todos = await this.todoModel
      .find({})
      .limit(limit)
      .exec();
    return todos;
  }
  async getTodoById(id: string): Promise<ITodo> {
    return await this.todoModel.findById(id).exec();
  }
  async updateTodoById(id: string, todo: ITodo): Promise<ITodo> {
    return await this.todoModel
      .findByIdAndUpdate(id, todo, { new: true })
      .exec();
  }
  async deleteTodoById(id: string): Promise<ITodo> {
    return await this.todoModel.findByIdAndDelete(id).exec();
  }
  async createTodo(todo: ITodo): Promise<ITodo> {
    const newTodo = new this.todoModel(todo);
    return await newTodo.save();
  }
}
