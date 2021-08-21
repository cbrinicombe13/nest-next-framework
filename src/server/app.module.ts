import { Module } from '@nestjs/common';
import { ViewModule } from './view/view.module';

@Module({
  imports: [
    /**
     * View module must be last (acts as wildcard route)
     */
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
