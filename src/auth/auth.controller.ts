import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: any) {
    const hashedPassword = await this.authService.hashPassword(
      userData.password,
    );
    // Aqui você salvaria no banco, mas vamos apenas simular
    return { message: 'Usuário registrado!', password: hashedPassword };
  }

  @Post('login')
  async login(@Body() userData: any) {
    // Simulando um usuário do banco
    const fakeUser = {
      id: 1,
      username: userData.username,
      password: '$2b$10$...',
    };

    const isValid = await this.authService.validatePassword(
      userData.password,
      fakeUser.password,
    );
    if (!isValid) return { message: 'Credenciais inválidas' };

    return this.authService.generateToken(fakeUser);
  }
}
