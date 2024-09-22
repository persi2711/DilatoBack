import { DetalleIngreso } from 'src/detalle-ingreso/entities/detalle-ingreso.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Ingreso' })
export class Ingreso {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text')
  TipoComprobante: string;
  @Column('text')
  SerieComprobante: string;
  @Column('text')
  NumeroComprobante: string;
  @Column({ type: 'timestamp' })
  FechaHoraIngreso: string;
  @Column('float', { default: 0 })
  Impuesto: number;
  @Column('int', { default: 0 })
  Total: number;
  @Column('bool', { default: true })
  Estado: boolean;
  @OneToMany(() => DetalleIngreso, (detalleIngreso) => detalleIngreso.ingreso)
  detalleIngreso: DetalleIngreso[];
  @ManyToOne(() => Persona, (persona) => persona.ingreso)
  @JoinColumn()
  persona: Persona;
  @ManyToOne(() => Usuario, (usuario) => usuario.ingreso)
  @JoinColumn()
  usuario: Usuario;
}
