import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { EnvService } from '../../../core/config/env.service';
import { LoginCredentials } from '../models/credentials.interface';
import { AuthService } from '../services/auth.service';
import { UserRoles } from '../../../shared/users/models/user.model';

interface ValidatedUser {
  email: string;
  role: UserRoles;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly envService: EnvService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: envService.JWT.key,
    });
  }

  public async validate(
    payload: any,
    request: LoginCredentials,
  ): Promise<ValidatedUser | HttpException> {
    const user = await this.authService.validateUser(request);
    const validatedUser = { email: user.email, role: user.role };
    return validatedUser || new UnauthorizedException();
  }
}
