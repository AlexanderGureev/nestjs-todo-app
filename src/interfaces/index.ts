import { Document, Connection, Model } from "mongoose";

export interface ITodoModel extends Document {
  _id: string;
  text: string;
  status: string;
  primary: boolean;
}
export interface IConfig {
  PORT: string;
  HOST: string;
  MONGO_URI?: string;
  REDIS_URI?: string;
  SESSION_PREFIX?: string;
  API_VERSION?: string;
  ENV?: string;
  JWT_SECRET?: string;
}
export interface ITodo {
  _id: string;
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
  getString(key: string): string;
}
export interface ITodoService {
  getAllTodos(): Promise<ITodo[]>;
}
export interface IConnection extends Connection {}
export interface IModel<T> extends Model<any> {}
