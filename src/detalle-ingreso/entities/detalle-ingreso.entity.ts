import { Articulo } from 'src/articulos/entities/articulo.entity';
import { Ingreso } from 'src/ingreso/entities/ingreso.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'DetalleIngreso' })
export class DetalleIngreso {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('int', { default: 0 })
  Cantidad: number;
  @Column('float', { default: 0 })
  Precio: number;
  @ManyToOne(() => Ingreso, (ingreso) => ingreso.detalleIngreso)
  @JoinColumn()
  ingreso: Ingreso;
  @ManyToOne(() => Articulo, (articulo) => articulo.detalleIngreso)
  @JoinColumn()
  articulo: Articulo;
}
