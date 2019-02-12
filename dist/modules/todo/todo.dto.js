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
class LimitDto {
}
__decorate([
    swagger_1.ApiModelProperty({ required: false, description: "Number of tasks" }),
    class_validator_1.IsInt(),
    class_validator_1.IsPositive(),
    class_validator_1.Min(1),
    class_validator_1.Max(100),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], LimitDto.prototype, "limit", void 0);
exports.LimitDto = LimitDto;
class IdDto {
}
__decorate([
    swagger_1.ApiModelProperty({ description: "Task id" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], IdDto.prototype, "id", void 0);
exports.IdDto = IdDto;
class TodoDto {
}
__decorate([
    swagger_1.ApiModelProperty({ example: "todo text", description: "Task decription" }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TodoDto.prototype, "text", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        required: false,
        example: "true",
        description: "Task status",
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsBooleanString(),
    __metadata("design:type", Boolean)
], TodoDto.prototype, "primary", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        required: false,
        example: "active",
        description: "Task priority",
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsIn(["active", "completed"]),
    __metadata("design:type", String)
], TodoDto.prototype, "status", void 0);
exports.TodoDto = TodoDto;
//# sourceMappingURL=todo.dto.js.map