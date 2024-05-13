import { IsNotEmpty, Max, Min } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}