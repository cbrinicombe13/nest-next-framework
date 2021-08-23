import { Module } from '@nestjs/common';
import { ViewModule } from './view/view.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/server/.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: `mongodb+srv://${config.get('MONGO_USER')}:${config.get(
          'MONGO_PASSWORD',
        )}@${config.get('MONGO_HOST')}/${config.get(
          'MONGO_DBNAME',
        )}?retryWrites=true&w=majority`,
      }),
      inject: [ConfigService],
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
