import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from '../../server/user/user.schema';

export interface IUser {
  username: string;
  password: string;
}

export class RegisterDto implements IUser {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export type RegisterResponse = Omit<User, 'password'>;
