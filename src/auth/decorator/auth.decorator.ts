import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidActions } from '../interfaces/validActions';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserActionGuardGuard } from '../Guards/user-action-guard/user-action-guard.guard';

export function Auth(...args: ValidActions[]) {
  return applyDecorators(
    RoleProtected(...args),
    UseGuards(AuthGuard(), UserActionGuardGuard),
  );
}
