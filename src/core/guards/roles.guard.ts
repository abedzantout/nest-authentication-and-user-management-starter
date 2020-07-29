import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private static matchRoles(roles: string[], userRoles: string): boolean {
    const userFound = roles.find((role) => userRoles === role);
    return !!(userFound && userFound.length);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return RolesGuard.matchRoles(roles, user.role);
  }
}
