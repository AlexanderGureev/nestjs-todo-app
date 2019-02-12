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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class RegisterUserDto {
}
__decorate([
    swagger_1.ApiModelProperty({ description: "User email", example: "mail@mail.com" }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "Username", example: "alex" }),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.IsAlphanumeric(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "username", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "User password", example: "test_password" }),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
exports.RegisterUserDto = RegisterUserDto;
class LoginUserDto {
}
__decorate([
    swagger_1.ApiModelProperty({ description: "User email", example: "mail@mail.com" }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: "User password", example: "test_password" }),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=auth.dto.js.map