import { IsUnique } from "src/shared/validation/is-unique";

export class CreateProductDto {
    @IsUnique({ tableName: 'products', column: 'name' })
    name: string;
    description: string;
}
