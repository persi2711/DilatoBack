import { Module } from '@nestjs/common';
import { DetalleIngresoService } from './detalle-ingreso.service';
import { DetalleIngresoController } from './detalle-ingreso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleIngreso } from './entities/detalle-ingreso.entity';

@Module({
  controllers: [DetalleIngresoController],
  providers: [DetalleIngresoService],
  imports: [TypeOrmModule.forFeature([DetalleIngreso])],
  exports: [TypeOrmModule],
})
export class DetalleIngresoModule {}
