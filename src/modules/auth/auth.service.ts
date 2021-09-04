import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async user(): Promise<any> {
    const user = await this.usersService.findOne();
    return user;
  }

  async login(user: any) {
    const payload = { _id: user._id, name: user.name, roles: user.roles };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
