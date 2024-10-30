import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
  PassportModule.register({
    defaultStrategy: 'jwt'
  }),
JwtModule.register({
  global: true,
  secret:'LOijtrkljdklsufidsui12jkj43k21l4',
  signOptions: {
    expiresIn: 3600
  }
})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule,JwtStrategy]
})
export class AuthModule {}
