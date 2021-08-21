import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
    constructor(private readonly viewService: ViewService) {}

    @Get('*')
    static(@Req() req: Request, @Res() res: Response) {
        const handle = this.viewService.getServer().getRequestHandler();

        handle(req, res);
    }
}
