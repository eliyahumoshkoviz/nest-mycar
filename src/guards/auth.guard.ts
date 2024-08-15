import { CanActivate, ExecutionContext } from '@nestjs/common';


//Reject request if user isn't signin
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();    
    return request.session.userId;
  }
}