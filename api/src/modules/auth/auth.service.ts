import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/functions/bcrypt';
import { ISignIn } from '@jonzubi/securscan-shared';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: ISignIn) {
    const { password, email } = user;
    const foundUser = await this.userService.findUserByEmail(email);

    if (foundUser === null) throw new UnauthorizedException();
    if (foundUser.loginByGoogle) throw new UnauthorizedException();

    const isMatch = comparePassword(password, foundUser.password);
    if (!isMatch) throw new UnauthorizedException();
    if (!foundUser.emailVerified)
      throw new UnauthorizedException('errors.emailNotVerified');

    const { access_token } = await this.jwtSign({
      email,
      _id: foundUser._id.toString(),
    });
    return {
      access_token,
      email,
    };
  }

  async jwtSign(user: { email: string; _id: string }) {
    const { email, _id } = user;
    const payload = { email, sub: _id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
