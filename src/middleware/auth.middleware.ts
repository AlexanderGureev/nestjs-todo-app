import {
  Injectable,
  Inject,
  NestMiddleware,
  MiddlewareFunction,
} from "@nestjs/common";
import { USER_MODEL_PROVIDER } from "../modules/constans";
import { IModel, IUserModel } from "src/interfaces";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(USER_MODEL_PROVIDER) private readonly userModel: IModel<IUserModel>,
  ) {}
  async resolve(): Promise<MiddlewareFunction> {
    return async (req, res, next) => {
      const { sessionid = false } = req.signedCookies;
      if (!sessionid) {
        return next();
      }
      const session = await req.redis.getAsync(`session:${sessionid}`);
      const { userId = "" } = JSON.parse(session);
      if (!userId) {
        return next();
      }
      const { _id, username, email } = await this.userModel
        .findById(userId)
        .exec();

      req.credentials = {
        user: { _id, username, email },
        isAuth: true,
      };
      next();
    };
  }
}
