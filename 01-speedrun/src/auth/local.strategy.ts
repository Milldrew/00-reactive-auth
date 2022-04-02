import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { AuthService } from './auth.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(authUserDto: AuthUserDto) {
    const user: { userId: number; username: string } =
      await this.authService.validateUser(authUserDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
