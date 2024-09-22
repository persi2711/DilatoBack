import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { AccionesModule } from 'src/acciones/acciones.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([Role]), AccionesModule, AuthModule],
  exports: [TypeOrmModule],
})
export class RolesModule {}
