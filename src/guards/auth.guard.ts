import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { credentials = null } = context.switchToHttp().getRequest();
    if (credentials && credentials.isAuth) {
      return true;
    }
    return false;
  }
}
