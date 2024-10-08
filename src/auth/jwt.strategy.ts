import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,//extraccion de Bearer
        private usersService: UsersService,
    ) {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false, // No ignorar fecha de expiracion
        secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }
    //Validacion de existencia del usuario en la Bd pra confitmar token
    async validate(payload: any): Promise<User> {
        const user = await this.usersService.findById(payload.sub);
        if (user && Number(user.status) === 1) {
        return user;
        }
        throw new UnauthorizedException('Token inválido');
    }
}
