import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { IsUnique } from "src/shared/validation/is-unique";

export class UserDto {
    @IsNotEmpty({ message: 'Username should not be empty' })
    @IsUnique({ tableName: 'users', column: 'username' })
    username: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @IsNotEmpty()
    @IsEmail()
    @IsUnique({ tableName: 'users', column: 'email' })
    email: string;
}