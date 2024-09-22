import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { Accione } from 'src/acciones/entities/accione.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Accione)
    private accioneRepository: Repository<Accione>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const { NombreRol, DescripcionRol, accioneId } = createRoleDto;
      const rol = this.roleRepository.create({ NombreRol, DescripcionRol });
      rol.Estado = true;
      if (accioneId && accioneId.length > 0) {
        const acciones = await this.accioneRepository.find({
          where: { Id: In(accioneId) },
          relations: ['modulo'],
        });
        if (acciones.length !== accioneId.length) {
          throw new NotFoundException(
            'Uno o más permisos no fueron encontrados',
          );
        }
        rol.accione = acciones;
      }
      await this.roleRepository.save(rol);
      return rol;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const roles = await this.roleRepository.find({ relations: ['accione'] });
    if (!roles) return 'no hay roles';
    return roles;
  }

  async findOne(Id: string) {
    const roles = await this.roleRepository.findOne({
      where: { Id },
      relations: ['accione'],
    });
    if (!roles) throw new NotFoundException(`no se encontro el rol`);
    return roles;
  }

  async update(Id: string, updateRoleDto: UpdateRoleDto) {
    const rol = await this.roleRepository.findOne({
      where: { Id },
      relations: ['accione'],
    });
    if (!rol) throw new NotFoundException(`no se encontro el rol`);
    if (updateRoleDto.accioneId && updateRoleDto.accioneId.length !== 0) {
      const acciones = await this.accioneRepository.find({
        where: { Id: In(updateRoleDto.accioneId) },
        relations: ['modulo'],
      });
      if (!acciones)
        throw new NotFoundException(`Uno o mas permisos no fueron encontrados`);
      rol.accione = acciones;
    }

    await this.roleRepository.merge(rol, updateRoleDto);
    return this.roleRepository.save(rol);
  }

  async remove(Id: string) {
    const rol = await this.roleRepository.findOne({
      where: { Id },
    });
    this.roleRepository.remove(rol);
    return `This action removes a #${Id} role`;
  }

  async ChangeStatus(Id: string) {
    const rol = await this.roleRepository.findOne({
      where: { Id },
    });
    rol.Estado = !rol.Estado;
    return this.roleRepository.save(rol);
  }
}
