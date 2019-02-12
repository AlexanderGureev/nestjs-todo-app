"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constans_1 = require("../constans");
const todo_dto_1 = require("./todo.dto");
const validation_pipe_1 = require("../../pipes/validation.pipe");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../guards/auth.guard");
let TodoController = class TodoController {
    constructor(appService) {
        this.appService = appService;
    }
    createTodo(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.appService.createTodo(todo);
        });
    }
    getAllTodos(res, { limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield this.appService.getAllTodos(limit);
            if (!todos.length) {
                return res.status(common_1.HttpStatus.NO_CONTENT).send();
            }
            return res.status(common_1.HttpStatus.OK).json(todos);
        });
    }
    getTodoById({ id }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.appService.getTodoById(id);
            if (!todo) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            return res.status(common_1.HttpStatus.OK).json(todo);
        });
    }
    updateTodoById({ id }, todo, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTodo = yield this.appService.updateTodoById(id, todo);
            if (!updatedTodo) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            return res.status(common_1.HttpStatus.CREATED).json(updatedTodo);
        });
    }
    deleteTodoById({ id }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedTodo = yield this.appService.deleteTodoById(id);
            if (!deletedTodo) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            return res.status(common_1.HttpStatus.OK).json(deletedTodo);
        });
    }
};
__decorate([
    swagger_1.ApiResponse({
        status: 201,
        description: "The todo has been successfully created.",
    }),
    swagger_1.ApiResponse({
        status: 400,
        description: "Validation failed.",
    }),
    swagger_1.ApiResponse({ status: 403, description: "Authorization required." }),
    common_1.Post(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.TodoDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "createTodo", null);
__decorate([
    swagger_1.ApiResponse({
        status: 200,
        description: "List of all todos.",
    }),
    swagger_1.ApiResponse({
        status: 204,
        description: "Todo list is empty.",
    }),
    swagger_1.ApiResponse({
        status: 400,
        description: "Validation failed.",
    }),
    swagger_1.ApiResponse({ status: 403, description: "Authorization required." }),
    common_1.Get(),
    __param(0, common_1.Res()),
    __param(1, common_1.Query(new validation_pipe_1.ParseToIntPipe({ isOptional: true }), new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, todo_dto_1.LimitDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getAllTodos", null);
__decorate([
    swagger_1.ApiResponse({
        status: 200,
        description: "Todo by id.",
    }),
    swagger_1.ApiResponse({
        status: 404,
        description: "Todo for this ID do not exist.",
    }),
    swagger_1.ApiResponse({
        status: 400,
        description: "Validation failed.",
    }),
    swagger_1.ApiResponse({ status: 403, description: "Authorization required." }),
    common_1.Get(":id"),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.IdDto, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodoById", null);
__decorate([
    swagger_1.ApiResponse({
        status: 201,
        description: "Updated todo by id.",
    }),
    swagger_1.ApiResponse({
        status: 404,
        description: "Todo for this ID do not exist.",
    }),
    swagger_1.ApiResponse({
        status: 400,
        description: "Validation failed.",
    }),
    swagger_1.ApiResponse({ status: 403, description: "Authorization required." }),
    common_1.Put(":id"),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.IdDto,
        todo_dto_1.TodoDto, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodoById", null);
__decorate([
    swagger_1.ApiResponse({
        status: 201,
        description: "Deleted todo by id.",
    }),
    swagger_1.ApiResponse({
        status: 404,
        description: "Todo for this ID do not exist.",
    }),
    swagger_1.ApiResponse({
        status: 400,
        description: "Validation failed.",
    }),
    swagger_1.ApiResponse({ status: 403, description: "Authorization required." }),
    common_1.Delete(":id"),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.IdDto, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodoById", null);
TodoController = __decorate([
    swagger_1.ApiUseTags("todos"),
    common_1.Controller("todos"),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, common_1.Inject(constans_1.TODO_SERVICE_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map