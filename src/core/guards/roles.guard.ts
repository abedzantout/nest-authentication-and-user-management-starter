import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../shared/users/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    console.log('called');
  }

  private static matchRoles(roles: string[], userRoles: UserRoles) {
    console.log(roles, userRoles);
    return true;
  }

  canActivate(context: ExecutionContext): boolean {
    console.log('called canActivate');
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    return RolesGuard.matchRoles(roles, user.roles);
  }
}
