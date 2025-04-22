import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('login')
    @ApiOperation({ summary: 'Login do usuário' })
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
