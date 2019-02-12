"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret._id;
            delete ret.password;
            return Object.assign({}, ret, { id: doc._id });
        },
    },
});
exports.UserSchema = UserSchema;
UserSchema.methods.hashPassword = (password) => __awaiter(this, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(10);
    const hash = yield bcrypt.hash(password, salt);
    return hash;
});
UserSchema.methods.comparePassword = (hash, password) => __awaiter(this, void 0, void 0, function* () {
    const isValid = yield bcrypt.compare(password, hash);
    return isValid;
});
//# sourceMappingURL=auth.schema.js.map