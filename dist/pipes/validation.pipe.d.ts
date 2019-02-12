import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
export declare class JoiValidationPipe implements PipeTransform {
    private readonly schema;
    constructor(schema: any);
    transform(value: any, metadata: ArgumentMetadata): any;
}
export declare class ParseToIntPipe implements PipeTransform {
    private readonly options;
    constructor(options: any);
    transform(value: any, metadata: ArgumentMetadata): any;
}
