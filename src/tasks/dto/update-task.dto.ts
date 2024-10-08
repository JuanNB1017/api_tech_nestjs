import { IsString, IsEnum, IsOptional,IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty({ message: 'The state field is required' })
    @IsEnum(['open', 'in_progress', 'done'])
    state?: string;
}
