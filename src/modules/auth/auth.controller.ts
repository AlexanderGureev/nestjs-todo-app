import {
  Inject,
  Injectable,
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
    const sessionId = await this.createSession(req, user);
    return res
      .cookie("sessionid", sessionId, this.sessionOptions)
      .status(HttpStatus.OK)
      .json(user);
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
  public async register(@Body() user: RegisterUserDto, @Req() req, @Res() res) {
    const userData = await this.authService.register(user);
    const sessionId = await this.createSession(req, userData);
    return res
      .cookie("sessionid", sessionId, this.sessionOptions)
      .status(HttpStatus.CREATED)
      .json(userData);
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
    await this.deleteSession(req);
    return res
      .clearCookie("sessionid")
      .status(HttpStatus.NO_CONTENT)
      .send();
  }
  private async createSession({ redis }, user) {
    const id = v4();
    const session = JSON.stringify({
      userId: user.id,
      id,
    });
    await redis.setAsync(`session:${id}`, session);
    return id;
  }
  private async deleteSession({ redis, signedCookies }) {
    return await redis.delAsync(`session:${signedCookies.sessionid}`); // обработать случай когда удаление кук возвращает 0
  }
}
