import { Module } from '@nestjs/common';
import { IngresoService } from './ingreso.service';
import { IngresoController } from './ingreso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingreso } from './entities/ingreso.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PersonasModule } from 'src/personas/personas.module';
import { DetalleIngresoModule } from 'src/detalle-ingreso/detalle-ingreso.module';
import { ArticulosModule } from 'src/articulos/articulos.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [IngresoController],
  providers: [IngresoService],
  imports: [
    TypeOrmModule.forFeature([Ingreso]),
    UsuarioModule,
    PersonasModule,
    DetalleIngresoModule,
    ArticulosModule,
    AuthModule,
  ],
})
export class IngresoModule {}
