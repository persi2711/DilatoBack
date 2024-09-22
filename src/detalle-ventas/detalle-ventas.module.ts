import { Module } from '@nestjs/common';
import { DetalleVentasService } from './detalle-ventas.service';
import { DetalleVentasController } from './detalle-ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalle-venta.entity';

@Module({
  controllers: [DetalleVentasController],
  providers: [DetalleVentasService],
  imports: [TypeOrmModule.forFeature([DetalleVenta])],
  exports: [TypeOrmModule],
})
export class DetalleVentasModule {}
