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
    if (res.error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: res.error.details.map(({ message }) => message),
      });
    }
    return res.value;
  }
}
@Injectable()
export class ParseToIntPipe implements PipeTransform {
  constructor(private readonly options) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const keys = Object.keys(value);
    if (!keys.length && this.options.isOptional) {
      return value;
    }
    const val = keys.reduce(
      (acc, key) => ({ [key]: parseInt(value[key], 10), ...acc }),
      {},
    );

    const isValid = Object.values(val).filter(isNaN);
    if (isValid.length) {
      throw new BadRequestException("Validation failed");
    }

    return val;
  }
}
