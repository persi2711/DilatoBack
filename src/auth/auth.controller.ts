import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuariodto } from 'src/usuario/dto/login-usuario.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body() loginUsuariodto: LoginUsuariodto) {
    return this.authService.login(loginUsuariodto);
  }
}
