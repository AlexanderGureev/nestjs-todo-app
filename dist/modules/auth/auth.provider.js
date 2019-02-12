"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constans_1 = require("../constans");
const auth_schema_1 = require("./auth.schema");
const auth_service_1 = require("./auth.service");
exports.providers = [
    {
        provide: constans_1.USER_MODEL_PROVIDER,
        useFactory: (connection) => {
            return connection.model("users", auth_schema_1.UserSchema);
        },
        inject: [constans_1.CONNECTION_PROVIDER],
    },
    {
        provide: constans_1.AUTH_SERVICE_PROVIDER,
        useClass: auth_service_1.AuthService,
    },
];
//# sourceMappingURL=auth.provider.js.map