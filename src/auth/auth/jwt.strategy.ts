import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Passport } from 'passport';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/user/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,private readonly configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
        })
    }

    async validate(payload: {username:string}) {

        const { username } = payload;
        const user = this.userRepo.findOneBy({username});
        console.log(user);
        return user;
    }
}