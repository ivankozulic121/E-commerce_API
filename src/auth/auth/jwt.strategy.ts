import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Passport } from 'passport';


@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'LOijtrkljdklsufidsui12jkj43k21l4',
        })
    }

    async validate(payload: any) {

        return { userId: payload.sub, username: payload.username}
    }
}