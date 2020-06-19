import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { ConfigService } from '../../../core/config/config.service';
import { JwtService } from '../services/jwt.service';
import { User } from '../../../shared/users/schemas/user.schema';
import { LoginCredentials } from '../models/credentials.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: configService.JWT.Key,
    });
  }

  public async validate(payload: any, request: LoginCredentials): Promise<User | HttpException> {
    const user = await this.jwtService.validateUser(request);
    return user || new UnauthorizedException();
  }
}
