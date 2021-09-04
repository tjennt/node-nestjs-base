import { IsAlpha, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty() userName: string;
    @IsNotEmpty() password: string;
    @IsNotEmpty() roles: Array<string>;
}
