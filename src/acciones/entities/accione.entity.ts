import { Modulo } from 'src/modulo/entities/modulo.entity';
import { Role } from 'src/roles/entities/role.entity';
import { text } from 'stream/consumers';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Acciones' })
export class Accione {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column('text', { unique: true })
  Nombre: string;
  @ManyToOne(() => Modulo, (modulo) => modulo.accione)
  @JoinColumn()
  modulo: Modulo;
  @ManyToMany(() => Role, (role) => role.accione)
  role: Role[];
}
