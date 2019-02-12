import {
  Injectable,
  Inject,
  NestMiddleware,
  MiddlewareFunction,
} from "@nestjs/common";
import { REDIS_CACHE_PROVIDER } from "../modules/constans";

@Injectable()
export class RedisMiddleware implements NestMiddleware {
  constructor(@Inject(REDIS_CACHE_PROVIDER) private readonly redis) {}
  resolve(): MiddlewareFunction {
    return (req, res, next) => {
      req.redis = this.redis;
      next();
    };
  }
}
