import { Categoria } from 'src/categorias/entities/categoria.entity';
import { DetalleIngreso } from 'src/detalle-ingreso/entities/detalle-ingreso.entity';
import { DetalleVenta } from 'src/detalle-ventas/entities/detalle-venta.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Articulos' })
export class Articulo {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text', { unique: true })
  CodigoArticulo: string;
  @Column('text', { unique: true })
  NombreArticulo: string;
  @Column('float', { default: 0 })
  PrecioVenta: number;
  @Column('int', { default: 0 })
  Stock: number;
  @Column('text', { nullable: true })
  DescripcionArticulo: string;
  @Column('bool', { default: true })
  Estado: boolean;
  @ManyToOne(() => Categoria, (categoria) => categoria.articulo)
  @JoinColumn()
  categoria: Categoria;
  @OneToMany(() => DetalleIngreso, (detalleIngreso) => detalleIngreso.articulo)
  detalleIngreso: DetalleIngreso[];
  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.articulo)
  detalleVenta: DetalleVenta;
}
