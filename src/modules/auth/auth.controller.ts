import {
  Inject,
  Injectable,
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { IAuthService } from "../../interfaces";
import { AUTH_SERVICE_PROVIDER } from "../constans";
import { RegisterUserDto, LoginUserDto } from "./auth.dto";
import { ApiResponse } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
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
  public async login(@Body() { email, password }: LoginUserDto) {
    return await this.authService.login(email, password);
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
  public async register(@Body() user: RegisterUserDto) {
    return await this.authService.register(user);
  }
}
