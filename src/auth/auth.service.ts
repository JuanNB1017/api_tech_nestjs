import { Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-userInfo.dto';

@Injectable()
export class AuthService {
constructor(private usersService: UsersService, private jwtService: JwtService) {}

  // Registro de nuevo usuario
async signup(createUserDto: CreateUserDto): Promise<{ id: number; username: string }> {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
    });
    return { id: user.id, username: user.username };
}

  // Validación de usuario para login
    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findByUsername(username);
        if (user && user.status == 1  ) {
            const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return user;
        }
        }
        throw new UnauthorizedException('Credenciales inválidas');
    }

  // Emisión de token JWT
    async login(user: User): Promise<{ access_token: string }> {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
