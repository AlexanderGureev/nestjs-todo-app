import { ITodo } from "../../interfaces";
export declare class LimitDto {
    readonly limit: number;
}
export declare class IdDto {
    readonly id: string;
}
export declare class TodoDto implements ITodo {
    readonly text: string;
    readonly primary: boolean;
    readonly status: string;
}
