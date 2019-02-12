"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constans_1 = require("../constans");
const todo_schema_1 = require("./todo.schema");
const todo_service_1 = require("./todo.service");
exports.providers = [
    {
        provide: constans_1.TODO_MODEL_PROVIDER,
        useFactory: (connection) => connection.model("todos", todo_schema_1.TodoSchema),
        inject: [constans_1.CONNECTION_PROVIDER],
    },
    {
        provide: constans_1.TODO_SERVICE_PROVIDER,
        useClass: todo_service_1.TodoService,
    },
];
//# sourceMappingURL=todo.provider.js.map