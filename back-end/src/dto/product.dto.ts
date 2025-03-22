import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto{
    @IsString()
    name:string

    @IsString()
    @IsOptional()
    description?:string

    @IsNumber()
    price:number

    @IsNumber()
    categoryId:number
}
