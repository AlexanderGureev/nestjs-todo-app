import {
  Inject,
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  UsePipes,
  Res,
  Req,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { IAuthService } from "../../interfaces";
import { AUTH_SERVICE_PROVIDER } from "../constans";
import { RegisterUserDto, LoginUserDto } from "./auth.dto";
import { ApiResponse, ApiUseTags } from "@nestjs/swagger";
import { v4 } from "uuid";
import { AuthGuard } from "../../guards/auth.guard";

@ApiUseTags("auth")
@Controller("auth")
export class AuthController {
  private readonly sessionOptions: {} = { httpOnly: true, signed: true };
  constructor(
    @Inject(AUTH_SERVICE_PROVIDER) private readonly authService: IAuthService,
  ) {}

  @ApiResponse({
    status: 200,
    description: "Login successful.",
  })
  @ApiResponse({
    status: 403,
    description: "Authorisation Error.",
  })
  @Post("/login")
  @UsePipes(ValidationPipe)
  public async login(
    @Body() { email, password }: LoginUserDto,
    @Req() req,
    @Res() res,
  ) {
    const user = await this.authService.login(email, password);
    await this.createSession(req, res, user);
    return res.status(HttpStatus.OK).json(user);
  }

  @ApiResponse({
    status: 201,
    description: "Registration successful, user created.",
  })
  @ApiResponse({
    status: 403,
    description: "Registration error.",
  })
  @Post("/register")
  @UsePipes(ValidationPipe)
  public async register(@Req() req, @Res() res, @Body() user: RegisterUserDto) {
    const userData = await this.authService.register(user);
    await this.createSession(req, res, userData);
    return res.status(HttpStatus.CREATED).json(userData);
  }

  @ApiResponse({
    status: 204,
    description: "Logout successful.",
  })
  @ApiResponse({
    status: 403,
    description: "Authorization required.",
  })
  @UseGuards(AuthGuard)
  @Get("/logout")
  public async logout(@Req() req, @Res() res) {
    await this.deleteSession(req, res);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
  private async createSession({ redis }, res, user) {
    const id = v4();
    const session = JSON.stringify({
      userId: user.id,
      id,
    });
    await redis.setAsync(`session:${id}`, session);
    res.cookie("sessionid", id, this.sessionOptions);
  }
  private async deleteSession({ redis, signedCookies }, res) {
    res.clearCookie("sessionid");
    return await redis.delAsync(`session:${signedCookies.sessionid}`); // handle the case when removing cookies returns 0
  }
}
