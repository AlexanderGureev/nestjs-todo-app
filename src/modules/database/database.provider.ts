import {
  CONNECTION_PROVIDER,
  CONFIG_SEVICE_PROVIDER,
  REDIS_CACHE_PROVIDER,
} from "../constans";
import { IConfigService } from "../../interfaces";
import * as mongoose from "mongoose";
import { promisifyAll } from "bluebird";
import * as redis from "redis";
promisifyAll(redis.RedisClient.prototype);

export const providers = [
  {
    provide: CONNECTION_PROVIDER,
    useFactory: async (configService: IConfigService) => {
      const uri = configService.get("MONGO_URI");
      return await mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
    },
    inject: [CONFIG_SEVICE_PROVIDER],
  },
  {
    provide: REDIS_CACHE_PROVIDER,
    useFactory: (configService: IConfigService) => {
      return redis.createClient(configService.get("REDIS_URI"));
    },
    inject: [CONFIG_SEVICE_PROVIDER],
  },
];
