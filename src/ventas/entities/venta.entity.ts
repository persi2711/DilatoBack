import { DetalleVenta } from 'src/detalle-ventas/entities/detalle-venta.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Ventas' })
export class Venta {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text')
  TipoComprobante: string;

  @Column('text')
  SerieComprobante: string;

  @Column('text')
  NumeroComprobante: string;

  @Column({ type: 'timestamp' })
  FechaHora: string;

  @Column('float', { default: 0 })
  Impuesto: number;

  @Column('int', { default: 0 })
  Total: number;

  @Column('bool', { default: true })
  Estado: boolean;
  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta)
  detalleVenta: DetalleVenta[];

  @ManyToOne(() => Usuario, (usuario) => usuario.venta)
  usuario: Usuario;

  @ManyToOne(() => Persona, (persona) => persona.venta)
  persona: Persona;
}
