import * as Joi from "joi";
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from "@nestjs/common";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const res = Joi.validate(value, this.schema);
    console.log(res.error);
    if (res.error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: res.error.details.map(({ message }) => message),
      });
    }
    return res.value;
  }
}
