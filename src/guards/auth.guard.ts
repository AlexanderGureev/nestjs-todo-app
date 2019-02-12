import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { redis, signedCookies } = context.switchToHttp().getRequest();
    const { sessionid = false } = signedCookies;
    if (!sessionid) {
      return false;
    }
    const session = await redis.getAsync(`session:${sessionid}`);
    if (!session) {
      return false;
    }
    return true;
  }
}
