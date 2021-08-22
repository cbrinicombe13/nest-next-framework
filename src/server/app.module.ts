import { Module } from '@nestjs/common';
import { ViewModule } from './view/view.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/server/.env'
    }),
    /**
     * View module must be last (acts as wildcard route)
     */
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
