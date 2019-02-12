import { ITodoService } from "../../interfaces";
import { TodoDto, IdDto, LimitDto } from "./todo.dto";
export declare class TodoController {
    private readonly appService;
    constructor(appService: ITodoService);
    createTodo(todo: TodoDto): Promise<import("../../interfaces").ITodo>;
    getAllTodos(res: any, { limit }: LimitDto): Promise<any>;
    getTodoById({ id }: IdDto, res: any): Promise<any>;
    updateTodoById({ id }: IdDto, todo: TodoDto, res: any): Promise<any>;
    deleteTodoById({ id }: IdDto, res: any): Promise<any>;
}
