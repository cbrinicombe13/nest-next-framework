import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../user/user.schema';
import { UserService } from '../user/user.service';

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
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { username: user.username, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: User): Promise<UserDocument> {
    return this.userService.create(user);
  }
}
