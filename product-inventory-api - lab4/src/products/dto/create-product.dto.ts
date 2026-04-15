import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsOptional, IsPositive, IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsPositive()
    @IsNumber()
    @Type(() => Number)
    price: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    stock: number;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
