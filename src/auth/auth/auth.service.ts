import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDTO } from 'src/user/user/registerUserDTO';
import { UserEntity } from 'src/user/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDTO } from 'src/user/user/loginUserDTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>,
private jwtService: JwtService){}

 async signUp(regDTO: RegisterUserDTO) : Promise<UserEntity> {

    const {first_name, last_name, username, password} = regDTO

    const user: UserEntity = new UserEntity();

    user.first_name = first_name;
    user.last_name = last_name;
    user.username = username;
    user.password = password;

    await this.repo.create(user);





    try {
        return await this.repo.save(user);
    }
    catch {
        throw new InternalServerErrorException();
    }
 }

async signIn(loginDTO: LoginUserDTO) {

    const { username, password } = loginDTO;

    const user = await this.repo.findOneBy({username})

    if(!user){

        throw new UnauthorizedException('Invalid credentials')
    }

    if (password == user.password){

        //const payload =  { sub:user.id, username: user.username}
        const payload = { username }
        const jwtoken = await this.jwtService.signAsync(payload);
        return {token: jwtoken}
        

    }
    

}

}
