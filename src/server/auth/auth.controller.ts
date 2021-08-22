import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { User, UserDocument } from "../user/user.schema";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as UserDocument);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: Request) {
    return req.user as UserDocument;
  }

  @Post('register')
  async register(@Body() body: User) {
    return this.authService.register(body);
  }
}
