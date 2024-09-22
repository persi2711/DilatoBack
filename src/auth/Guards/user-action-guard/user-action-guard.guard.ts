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
    const usuario = await this.usuarioRepository.findOne({
      where: { Id: user.Id },
      relations: ['role'],
    });
    const role = await this.roleRepository.findOne({
      where: { Id: usuario.role.Id },
      relations: ['accione'],
    });

    if (role.accione.find((accion) => accion.Nombre === validActions[0])) {
      return true;
    }

    return false;
  }
}
