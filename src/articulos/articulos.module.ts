import { Module } from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { ArticulosController } from './articulos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articulo } from './entities/articulo.entity';
import { CategoriasService } from 'src/categorias/categorias.service';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ArticulosController],
  providers: [ArticulosService],
  imports: [TypeOrmModule.forFeature([Articulo]), CategoriasModule, AuthModule],
  exports: [TypeOrmModule],
})
export class ArticulosModule {}
