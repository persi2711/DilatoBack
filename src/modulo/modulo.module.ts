import { Module } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { ModuloController } from './modulo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo.entity';

@Module({
  controllers: [ModuloController],
  providers: [ModuloService],
  imports: [TypeOrmModule.forFeature([Modulo])],
  exports: [TypeOrmModule],
})
export class ModuloModule {}
