import { TaskDto } from 'src/modules/task/dto';

export class UserDto {
  id: string;
  email: string;
  tasks: TaskDto[];
}
