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
const auth_dto_1 = require("./auth.dto");
const swagger_1 = require("@nestjs/swagger");
const uuid_1 = require("uuid");
const auth_guard_1 = require("../../guards/auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.sessionOptions = { httpOnly: true, signed: true };
    }
    login({ email, password }, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.login(email, password);
            const sessionId = yield this.createSession(req, user);
            return res
                .cookie("sessionid", sessionId, this.sessionOptions)
                .status(common_1.HttpStatus.OK)
                .json(user);
        });
    }
    register(user, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.authService.register(user);
            const sessionId = yield this.createSession(req, userData);
            return res
                .cookie("sessionid", sessionId, this.sessionOptions)
                .status(common_1.HttpStatus.CREATED)
                .json(userData);
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteSession(req);
            return res
                .clearCookie("sessionid")
                .status(common_1.HttpStatus.NO_CONTENT)
                .send();
        });
    }
    createSession({ redis }, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = uuid_1.v4();
            const session = JSON.stringify({
                userId: user.id,
                id,
            });
            yield redis.setAsync(`session:${id}`, session);
            return id;
        });
    }
    deleteSession({ redis, signedCookies }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis.delAsync(`session:${signedCookies.sessionid}`);
        });
    }
};
__decorate([
    swagger_1.ApiResponse({
        status: 200,
        description: "Login successful.",
    }),
    swagger_1.ApiResponse({
        status: 403,
        description: "Authorisation Error.",
    }),
    common_1.Post("/login"),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    swagger_1.ApiResponse({
        status: 201,
        description: "Registration successful, user created.",
    }),
    swagger_1.ApiResponse({
        status: 403,
        description: "Registration error.",
    }),
    common_1.Post("/register"),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    swagger_1.ApiResponse({
        status: 204,
        description: "Logout successful.",
    }),
    swagger_1.ApiResponse({
        status: 403,
        description: "Authorization required.",
    }),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Get("/logout"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    swagger_1.ApiUseTags("auth"),
    common_1.Controller("auth"),
    __param(0, common_1.Inject(constans_1.AUTH_SERVICE_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map