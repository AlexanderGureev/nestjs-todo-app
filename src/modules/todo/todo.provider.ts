import {
  TODO_MODEL_PROVIDER,
  CONNECTION_PROVIDER,
  TODO_SERVICE_PROVIDER,
} from "../constans";
import { IConnection } from "../../interfaces";
import { TodoSchema } from "./todo.schema";
import { TodoService } from "./todo.service";

export const providers = [
  {
    provide: TODO_MODEL_PROVIDER,
    useFactory: (connection: IConnection) =>
      connection.model("Todo", TodoSchema),
    inject: [CONNECTION_PROVIDER],
  },
  {
    provide: TODO_SERVICE_PROVIDER,
    useClass: TodoService,
  },
];
