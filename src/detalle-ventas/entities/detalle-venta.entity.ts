import { Articulo } from 'src/articulos/entities/articulo.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'DetalleVenta' })
export class DetalleVenta {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('int', { default: 0 })
  Cantidad: number;
  @Column('int', { default: 0 })
  Descucento: number;
  @ManyToOne(() => Articulo, (articulo) => articulo.detalleVenta)
  @JoinTable()
  articulo: Articulo;
  @JoinTable()
  @ManyToOne(() => Venta, (venta) => venta.detalleVenta)
  venta: Venta;
}
