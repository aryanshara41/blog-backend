import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ResourceAcessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const user = request.user;
    if ((params.id && user.id === params.id) || user.role == 'admin' ) {
      return true;
    }
    return false;
  }
}
