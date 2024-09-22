import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { DetalleVentasModule } from 'src/detalle-ventas/detalle-ventas.module';
import { ArticulosModule } from 'src/articulos/articulos.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PersonasModule } from 'src/personas/personas.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [VentasController],
  providers: [VentasService],
  imports: [
    TypeOrmModule.forFeature([Venta]),
    DetalleVentasModule,
    ArticulosModule,
    UsuarioModule,
    PersonasModule,
    AuthModule,
  ],
})
export class VentasModule {}
