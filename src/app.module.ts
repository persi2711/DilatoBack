import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { ModuloModule } from './modulo/modulo.module';
import { AccionesModule } from './acciones/acciones.module';
import { RolesModule } from './roles/roles.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DetalleIngresoModule } from './detalle-ingreso/detalle-ingreso.module';
import { ArticulosModule } from './articulos/articulos.module';
import { DetalleVentasModule } from './detalle-ventas/detalle-ventas.module';
import { IngresoModule } from './ingreso/ingreso.module';
import { VentasModule } from './ventas/ventas.module';
import { PersonasModule } from './personas/personas.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriasModule,
    ModuloModule,
    AccionesModule,
    RolesModule,
    UsuarioModule,
    DetalleIngresoModule,
    ArticulosModule,
    DetalleVentasModule,
    IngresoModule,
    VentasModule,
    PersonasModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
