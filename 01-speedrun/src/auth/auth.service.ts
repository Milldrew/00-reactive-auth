import { Injectable } from '@nestjs/common';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(authUserDto: AuthUserDto) {
    const user = await this.usersService.findOneByUsername(authUserDto);
    if (user && user.password === authUserDto.password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
