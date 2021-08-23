import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { RegisterDto, RegisterResponse } from '../../shared/types/auth';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userService.findOne(username);
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch && user;
  }

  async login(user: UserDocument) {
    const payload = { username: user.username, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterDto): Promise<RegisterResponse> {
    const existingUser = await this.userService.findOne(user.username);
    if (existingUser) {
      throw new HttpException('Username is taken', HttpStatus.CONFLICT);
    }
    const { username, ...rest } = await this.userService.create(user);
    return { username };
  }
}
