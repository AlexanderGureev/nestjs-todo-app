import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from "@nestjs/common";
import { REDIS_CACHE_PROVIDER } from "../modules/constans";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(REDIS_CACHE_PROVIDER) private readonly redis) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { sessionid = false } = request.signedCookies;
    if (!sessionid) {
      return false;
    }
    const session = await this.redis.getAsync(`session:${sessionid}`);
    if (!session) {
      return false;
    }
    return true;
  }
}
