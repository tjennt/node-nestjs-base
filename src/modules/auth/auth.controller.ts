import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('login')
    async login(@Req() req): Promise<any> {
        const user = await this.authService.user();
        return this.authService.login(user);
    }
}
