"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    primary: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "active",
    },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret._id;
            return Object.assign({}, ret, { id: doc._id });
        },
    },
});
exports.TodoSchema = TodoSchema;
//# sourceMappingURL=todo.schema.js.map