import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';

import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private configService: ConfigService,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.usuarioRepository.create(createUsuarioDto);
    const rol = await this.roleRepository.findOne({
      where: { Id: createUsuarioDto.RoleId },
    });
    if (!rol) throw new NotFoundException(`No existe el rol`);
    usuario.role = rol;
    const correo = await this.usuarioRepository.findOne({
      where: { Email: createUsuarioDto.Email },
    });
    if (correo) throw new NotFoundException(`Ya existe ese correo`);
    const telefono = await this.usuarioRepository.findOne({
      where: { Telefono: createUsuarioDto.Telefono },
    });
    if (telefono)
      throw new NotFoundException(`Ya existe un usuario con ese telefono`);
    usuario.Password = bcrypt.hashSync(usuario.Password, 10);
    usuario.Estado = true;
    await this.usuarioRepository.save(usuario);
    return usuario;
  }

  async findAll() {
    const usuarios = await this.usuarioRepository.find({ relations: ['role'] });
    if (!usuarios) return 'no hay usuarios';
    return usuarios;
  }

  async findOne(Id: string) {
    const usuarios = await this.usuarioRepository.findOne({
      where: { Id },
      relations: ['role'],
    });
    if (!usuarios) throw new NotFoundException(`No existe el usuario`);
    return usuarios;
  }

  async update(Id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { Id },
      relations: ['role'],
    });
    if (!usuario) throw new NotFoundException(`No existe el usuario`);
    if (updateUsuarioDto.Email && updateUsuarioDto.Email !== usuario.Email) {
      const email = await this.usuarioRepository.findOne({
        where: { Email: updateUsuarioDto.Email },
      });
      if (email)
        throw new NotFoundException(`EL usuario con ese correo ya existe`);
    }
    if (
      updateUsuarioDto.Telefono &&
      updateUsuarioDto.Telefono !== usuario.Telefono
    ) {
      const Telefono = await this.usuarioRepository.findOne({
        where: { Telefono: updateUsuarioDto.Telefono },
      });
      if (Telefono)
        throw new NotFoundException(`EL usuario con ese Telefono ya existe`);
    }

    if (updateUsuarioDto.RoleId) {
      const rol = await this.roleRepository.findOne({
        where: { Id: updateUsuarioDto.RoleId },
      });
      if (!rol) throw new NotFoundException(`No existe el rol`);
      usuario.role = rol;
    }
    await this.usuarioRepository.merge(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(Id: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { Id },
    });
    if (!usuario) throw new NotFoundException(`No existe el usuario`);
    this.usuarioRepository.remove(usuario);
    return `This action removes a #${Id} usuario`;
  }

  async ChangeStatus(Id: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { Id },
    });
    usuario.Estado = !usuario.Estado;
    return this.usuarioRepository.save(usuario);
  }
}
