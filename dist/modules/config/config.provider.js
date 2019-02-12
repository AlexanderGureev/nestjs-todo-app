"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_service_1 = require("./config.service");
const constans_1 = require("../constans");
exports.providers = [
    {
        provide: constans_1.CONFIG_SEVICE_PROVIDER,
        useClass: config_service_1.ConfigService,
    },
];
//# sourceMappingURL=config.provider.js.map