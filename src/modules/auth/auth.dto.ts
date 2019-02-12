import { IUser } from "../../interfaces";
import { IsEmail, IsString, MinLength, IsAlphanumeric } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class RegisterUserDto implements IUser {
  @ApiModelProperty({ description: "User email.", example: "mail@mail.com" })
  @IsEmail()
  readonly email: string;

  @ApiModelProperty({ description: "Username.", example: "alex" })
  @IsString()
  @MinLength(3)
  @IsAlphanumeric()
  readonly username: string;

  @ApiModelProperty({ description: "User password", example: "test_password" })
  @IsString()
  @MinLength(3)
  readonly password: string;
}

export class LoginUserDto {
  @ApiModelProperty({ description: "User email.", example: "mail@mail.com" })
  @IsEmail()
  readonly email: string;

  @ApiModelProperty({ description: "User password.", example: "test_password" })
  @IsString()
  @MinLength(3)
  readonly password: string;
}
