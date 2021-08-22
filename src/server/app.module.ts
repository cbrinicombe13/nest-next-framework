import { Module } from '@nestjs/common';
import { ViewModule } from './view/view.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/server/.env'
    }),
    MongooseModule.forRoot('mongodb+srv://charlie_test:8sVBQWtMLw5mDhCM@cluster0.fkpj7.mongodb.net/framework?retryWrites=true&w=majority'),
    /**
     * View module must be last (acts as wildcard route)
     */
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
