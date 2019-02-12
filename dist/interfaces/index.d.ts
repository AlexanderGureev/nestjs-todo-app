import { Document, Connection, Model } from "mongoose";
export interface ITodoModel extends Document {
    _id: string;
    text: string;
    status: string;
    primary: boolean;
}
export interface IUserModel extends Document {
    _id: string;
    username: string;
    password: string;
    database: string;
    comparePassword: (hash: string, password: string) => boolean;
    hashPassword: (password: string) => string;
}
export interface IConfig {
    PORT: string;
    HOST: string;
    MONGO_URI?: string;
    REDIS_URI?: string;
    SESSION_PREFIX?: string;
    API_VERSION?: string;
    ENV?: string;
    COOKIE_SECRET?: string;
}
export interface ITodo {
    text: string;
    status: string;
    primary: boolean;
}
export interface IMongodbConfig {
    username: string;
    password: string;
    database: string;
}
export interface IConfigService {
    get(key: string): string;
}
export interface ITodoService {
    getAllTodos(limit?: number): Promise<ITodo[]>;
    getTodoById(id: string): Promise<ITodo>;
    updateTodoById(id: string, todo: ITodo): Promise<ITodo>;
    deleteTodoById(id: string): Promise<ITodo>;
    createTodo(todo: ITodo): Promise<ITodo>;
}
export interface IUser {
    email: string;
    username: string;
    password: string;
}
export interface IAuthService {
    login(email: string, password: string): Promise<IUser>;
    register(user: IUser): Promise<IUser>;
}
export interface IConnection extends Connection {
}
export interface IModel<T> extends Model<any> {
}
