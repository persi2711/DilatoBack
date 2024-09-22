import { Module } from '@nestjs/common';
import { AccionesService } from './acciones.service';
import { AccionesController } from './acciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accione } from './entities/accione.entity';
import { ModuloModule } from 'src/modulo/modulo.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AccionesController],
  providers: [AccionesService],
  imports: [TypeOrmModule.forFeature([Accione]), ModuloModule, AuthModule],
  exports: [TypeOrmModule],
})
export class AccionesModule {}
