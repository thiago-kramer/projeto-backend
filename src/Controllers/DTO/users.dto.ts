import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";

export class UserDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly login: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly password: string;

}