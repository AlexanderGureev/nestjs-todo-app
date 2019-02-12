import {
  IsMongoId,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsBooleanString,
  IsIn,
  IsNumberString,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsNumber,
  IsInt,
  IsPositive,
  IsAlphanumeric,
  IsAlpha,
} from "class-validator";
import { ITodo } from "../../interfaces";
export class LimitDto {
  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(1)
  readonly limit: number;
}

export class IdDto {
  @IsMongoId()
  readonly id: string;
}

export class TodoDto implements ITodo {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly text: string;

  @IsOptional()
  @IsBooleanString()
  readonly primary: boolean;

  @IsOptional()
  @IsString()
  @IsIn(["active", "completed"])
  readonly status: string;
}
