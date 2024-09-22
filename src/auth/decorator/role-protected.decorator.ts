import { SetMetadata } from '@nestjs/common';
import { ValidActions } from '../interfaces/validActions';
export const Meta_Actions = 'accione';
export const RoleProtected = (...args: ValidActions[]) => {
  return SetMetadata(Meta_Actions, args);
};
