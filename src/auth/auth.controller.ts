import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-userInfo.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // Ruta para registro de nuevos usuarios
    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.signup(createUserDto);
        return { id: user.id, username: user.username };
    }

    // Ruta para login de usuarios
    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        const user = await this.authService.validateUser(body.username, body.password);
        return this.authService.login(user);
    }
}
