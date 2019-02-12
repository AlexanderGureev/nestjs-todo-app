"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let ConfigService = class ConfigService {
    constructor() {
        this.mongodbConfig = {
            username: encodeURIComponent("todoAdmin"),
            password: encodeURIComponent("932jnHsjnS87123"),
            database: "todoDB",
        };
        this.config = {
            PORT: process.env.PORT || "8080",
            HOST: process.env.HOST || "0.0.0.0",
            ENV: process.env.ENV || "development",
            SESSION_PREFIX: "session",
            COOKIE_SECRET: "test",
            API_VERSION: "v1",
            MONGO_URI: process.env.MONGO_URI || this.getMongoConnectionUri(),
            REDIS_URI: process.env.REDIS_URI || `redis://localhost:6379`,
        };
        this.get = key => this.config[key];
    }
    getMongoConnectionUri() {
        const { username, password, database } = this.mongodbConfig;
        return `mongodb://${username}:${password}@localhost:27017/${database}`;
    }
};
ConfigService = __decorate([
    common_1.Injectable()
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map