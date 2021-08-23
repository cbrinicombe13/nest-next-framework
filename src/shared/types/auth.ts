import { IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../../server/user/user.schema';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export type RegisterResponse = Omit<User, 'password'>;
