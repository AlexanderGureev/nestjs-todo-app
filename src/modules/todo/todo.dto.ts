import {
  IsMongoId,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsBooleanString,
  IsIn,
  Min,
  Max,
  IsInt,
  IsPositive,
} from "class-validator";
import { ITodo } from "../../interfaces";
import { ApiModelProperty } from "@nestjs/swagger";

export class LimitDto {
  @ApiModelProperty({ required: false, description: "Number of tasks" })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(100)
  @IsOptional()
  readonly limit: number;
}

export class IdDto {
  @ApiModelProperty({ description: "Task id" })
  @IsMongoId()
  readonly id: string;
}

export class TodoDto implements ITodo {
  @ApiModelProperty({ example: "todo text", description: "Task decription" })
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @ApiModelProperty({
    required: false,
    example: "true",
    description: "Task status",
  })
  @IsOptional()
  @IsBooleanString()
  readonly primary: boolean;

  @ApiModelProperty({
    required: false,
    example: "active",
    description: "Task priority",
  })
  @IsOptional()
  @IsString()
  @IsIn(["active", "completed"])
  readonly status: string;
}
