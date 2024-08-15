import { CanActivate, ExecutionContext } from '@nestjs/common';

//Reject request if user isn't signin
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) return false;    
    return request.currentUser.admin
  }
}