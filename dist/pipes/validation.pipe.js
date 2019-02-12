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
const Joi = require("joi");
const common_1 = require("@nestjs/common");
let JoiValidationPipe = class JoiValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        const res = Joi.validate(value, this.schema);
        if (res.error) {
            throw new common_1.BadRequestException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: res.error.details.map(({ message }) => message),
            });
        }
        return res.value;
    }
};
JoiValidationPipe = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Object])
], JoiValidationPipe);
exports.JoiValidationPipe = JoiValidationPipe;
let ParseToIntPipe = class ParseToIntPipe {
    constructor(options) {
        this.options = options;
    }
    transform(value, metadata) {
        const keys = Object.keys(value);
        if (!keys.length && this.options.isOptional) {
            return value;
        }
        const val = keys.reduce((acc, key) => (Object.assign({ [key]: parseInt(value[key], 10) }, acc)), {});
        const isValid = Object.values(val).filter(isNaN);
        if (isValid.length) {
            throw new common_1.BadRequestException("Validation failed");
        }
        return val;
    }
};
ParseToIntPipe = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Object])
], ParseToIntPipe);
exports.ParseToIntPipe = ParseToIntPipe;
//# sourceMappingURL=validation.pipe.js.map