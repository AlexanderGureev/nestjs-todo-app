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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const todo_module_1 = require("./todo/todo.module");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("./config/config.module");
const redis_middleware_1 = require("../middleware/redis.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const cookieParser = require("cookie-parser");
const constans_1 = require("./constans");
const morgan = require("morgan");
const helmet = require("helmet");
let AppModule = class AppModule {
    constructor(configService) {
        this.configService = configService;
    }
    configure(consumer) {
        consumer
            .apply(morgan("tiny"), helmet(), cookieParser(this.configService.get("COOKIE_SECRET")), redis_middleware_1.RedisMiddleware, auth_middleware_1.AuthMiddleware)
            .forRoutes("auth", "todos");
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [todo_module_1.TodoModule, auth_module_1.AuthModule, config_module_1.ConfigModule],
    }),
    __param(0, common_1.Inject(constans_1.CONFIG_SEVICE_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map