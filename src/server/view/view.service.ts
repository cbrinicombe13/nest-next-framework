import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';
import NextServer from 'next/dist/server/next-server';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit() {
    try {
      // @ts-ignore
      this.server = next({ dev: true, dir: './src/client' });
      await this.server.prepare();
    } catch (error) {
      console.log('Server Error: ' + error);
    }
  }

  getServer(): NextServer {
    return this.server;
  }
}
