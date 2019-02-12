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
const constans_1 = require("../constans");
const mongoose = require("mongoose");
const bluebird_1 = require("bluebird");
const redis = require("redis");
bluebird_1.promisifyAll(redis.RedisClient.prototype);
exports.providers = [
    {
        provide: constans_1.CONNECTION_PROVIDER,
        useFactory: (configService) => __awaiter(this, void 0, void 0, function* () {
            const uri = configService.get("MONGO_URI");
            return yield mongoose.connect(uri, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
            });
        }),
        inject: [constans_1.CONFIG_SEVICE_PROVIDER],
    },
    {
        provide: constans_1.REDIS_CACHE_PROVIDER,
        useFactory: (configService) => {
            return redis.createClient(configService.get("REDIS_URI"));
        },
        inject: [constans_1.CONFIG_SEVICE_PROVIDER],
    },
];
//# sourceMappingURL=database.provider.js.map