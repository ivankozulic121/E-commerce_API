import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from 'src/user/user/registerUserDTO';
import { AuthService } from './auth.service';
import { ValidationPipe } from '@nestjs/common';
import { LoginUserDTO } from 'src/user/user/loginUserDTO';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

@Post('register')

signUp(@Body(ValidationPipe) regDTO: RegisterUserDTO) {

    return this.authService.signUp(regDTO);
    
}

@Post('login')

signIn(@Body(ValidationPipe) loginDTO: LoginUserDTO) {

    return this.authService.signIn(loginDTO);
}




}
