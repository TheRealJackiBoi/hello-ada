import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  description?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'creatorEmail is required' })
  creatorEmail: string;

  dueDate?: string;
}
