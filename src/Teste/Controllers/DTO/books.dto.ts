import {
    ArrayMinSize,
    IsNotEmpty,
    isNotEmpty, IsNotEmptyObject,
    IsNumber,
    IsPositive,
    IsString,
    isString,
    MaxLength,
    MinLength, ValidateNested
} from "class-validator";
import {AuthorDto} from "./author.dto";
import {Type} from "class-transformer";


export class BookDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;

    @IsNotEmpty()
    @Type(() => AuthorDto)
    @ArrayMinSize(1)
    @IsNotEmptyObject({each:true})
    @ValidateNested({each:true})
    readonly author: AuthorDto[];

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly language: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly releaseYear: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly publisher: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly pages: number;

}