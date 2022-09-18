import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../enum/category";
import {
    IsNumber,
    IsNotEmpty,
    IsString,
    IsEnum,
} from 'class-validator';

export class CreateReceiptDto {
    @IsEnum(Category)
    @IsNotEmpty()
    @ApiProperty({
        description: 'The product category',
        enum: Category,
        required: true
    })
    category: Category;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The product category',
        required: true
    })
    title: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The cost of the product/service',
        minimum: 1,
        default: 1,
        required: true
    })
    cost: number;

}
