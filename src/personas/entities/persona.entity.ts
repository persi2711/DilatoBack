import { Ingreso } from 'src/ingreso/entities/ingreso.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Personas' })
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text')
  TipoPersona: string;
  @Column('text')
  NombrePersona: string;
  @Column('text')
  TipoDocumento: string;
  @Column('text')
  NumeroDocumento: string;
  @Column('text')
  DireccionPersona: string;
  @Column('text')
  TelefonoPersona: string;
  @Column('text', { unique: true })
  EmailPersona: string;
  @OneToMany(() => Ingreso, (ingreso) => ingreso.persona)
  ingreso: Ingreso;
  @OneToMany(() => Venta, (venta) => venta.persona)
  venta: Venta;
}
