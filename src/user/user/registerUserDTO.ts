import { IsNotEmpty } from 'class-validator';


export class RegisterUserDTO {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}