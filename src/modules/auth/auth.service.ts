import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { IUserModel, IAuthService, IUser, IModel } from "src/interfaces";
import { USER_MODEL_PROVIDER } from "../constans";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_MODEL_PROVIDER) private readonly userModel: IModel<IUserModel>,
  ) {}

  public async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "User not found",
        },
        403,
      );
    }
    const isValid = await user.comparePassword(user.password, password);
    if (!isValid) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "Invalid credentials",
        },
        403,
      );
    }
    return user;
  }
  public async register(user: IUser) {
    try {
      const newUser = await new this.userModel(user);
      const hashPassword = await newUser.hashPassword(user.password);
      newUser.password = hashPassword;
      return await newUser.save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "User with such data already exists.",
        },
        403,
      );
    }
  }
}
