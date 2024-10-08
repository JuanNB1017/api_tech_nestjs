import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-userInfo.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}
    //Servicio de creacion de usuario
    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({ where: { username: createUserDto.username } });
        if (existingUser) {
            throw new ConflictException('Este usuario ya está en uso, intente otro diferente');
        }
        return this.userModel.create(createUserDto);
    }
    // Servicio de verificacion de existencia
    async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({
            where: { 
            username, 
            status: '1' // o 1 si es número
            }
        });
        return user;
        }
    
    async findById(id: number): Promise<User | undefined> {
        return this.userModel.findByPk(id-1);
    }
}
