import { Injectable, Inject } from "@nestjs/common";
import { ITodoModel, IModel } from "../../interfaces";
import { TODO_MODEL_PROVIDER } from "../constans";

@Injectable()
export class TodoService {
  constructor(
    @Inject(TODO_MODEL_PROVIDER) private readonly todoModel: IModel<ITodoModel>,
  ) {}

  async getAllTodos(): Promise<any> {
    const todos = await this.todoModel.find({}).exec();
    return todos;
  }
}
