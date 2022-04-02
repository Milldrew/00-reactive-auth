import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(authUserDto: AuthUserDto) {
    const user = await this.usersService.findOneByUsername(authUserDto);
    if (user && user.password === authUserDto.password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService,
    };
  }
}
