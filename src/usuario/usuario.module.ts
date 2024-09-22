import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { RolesModule } from 'src/roles/roles.module';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    RolesModule,
    JwtModule,
    ConfigModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class UsuarioModule {}
