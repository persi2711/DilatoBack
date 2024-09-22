import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { LoginUsuariodto } from '../usuario/dto/login-usuario.dto';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUsuariodto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { Email: email },
      select: { Email: true, Password: true, Id: true },
      relations: ['role'], //! OJO!
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.Password))
      throw new UnauthorizedException('Credentials are not valid (password)');
    const role = await this.roleRepository.findOne({
      where: { Id: user.role.Id },
      relations: ['accione'],
    });
    if (!role) throw new UnauthorizedException('you dont have roles');
    return {
      token: this.getJwtToken({
        Id: user.Id,
        Rol: user.role.NombreRol,
        Permisos: role.accione,
      }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
