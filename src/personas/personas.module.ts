import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PersonasController],
  providers: [PersonasService],
  imports: [TypeOrmModule.forFeature([Persona]), AuthModule],
  exports: [TypeOrmModule],
})
export class PersonasModule {}
