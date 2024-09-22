import { Ingreso } from 'src/ingreso/entities/ingreso.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text')
  NombreUsuario: string;
  @Column('text')
  TipoDocumento: string;
  @Column('text')
  NumeroDocumento: string;
  @Column('text')
  Direccion: string;
  @Column('text')
  Telefono: string;
  @Column('text', { unique: true })
  Email: string;
  @Column('text', { select: false })
  Password: string;
  @Column('bool', { default: true })
  Estado: boolean;
  @OneToMany(() => Ingreso, (ingreso) => ingreso.usuario)
  ingreso: Ingreso;
  @OneToMany(() => Venta, (venta) => venta.usuario)
  venta: Venta;
  @ManyToOne(() => Role, (role) => role.usuario)
  @JoinColumn()
  role: Role;
}
