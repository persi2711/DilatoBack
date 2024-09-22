import { ApiProperty } from '@nestjs/swagger';
import { Articulo } from 'src/articulos/entities/articulo.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Categorias' })
export class Categoria {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @ApiProperty()
  @Column('text', { unique: true })
  NombreCategoria: string;
  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  Descripcion: string;
  @ApiProperty()
  @Column('bool')
  Estado: boolean;
  @ApiProperty()
  @OneToMany(() => Articulo, (articulo) => articulo.categoria)
  articulo: Articulo;
}
