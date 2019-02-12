import { IModel, ITodoModel, ITodo } from "../../interfaces";
import { ITodoService } from "../../interfaces";
export declare class TodoService implements ITodoService {
    private readonly todoModel;
    constructor(todoModel: IModel<ITodoModel>);
    getAllTodos(limit: number): Promise<ITodo[]>;
    getTodoById(id: string): Promise<ITodo>;
    updateTodoById(id: string, todo: ITodo): Promise<ITodo>;
    deleteTodoById(id: string): Promise<ITodo>;
    createTodo(todo: ITodo): Promise<ITodo>;
}
