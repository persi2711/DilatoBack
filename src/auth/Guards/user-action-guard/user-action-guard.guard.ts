import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Meta_Actions } from 'src/auth/decorator/role-protected.decorator';
import { Role } from 'src/roles/entities/role.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserActionGuardGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const validActions: string[] = this.reflector.get(
      Meta_Actions,
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest();
    const user = req.user as Usuario;
    if (!user) throw new NotFoundException(`no se encotro el usuario`);

    return true;
  }
}
