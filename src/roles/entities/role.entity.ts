import { Accione } from 'src/acciones/entities/accione.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text', { unique: true })
  NombreRol: string;
  @Column('text', { nullable: true })
  DescripcionRol: string;
  @Column('bool', { default: true })
  Estado: boolean;
  @ManyToMany(() => Accione, (accione) => accione.role)
  @JoinTable()
  accione: Accione[];
  @OneToMany(() => Usuario, (usuario) => usuario.role)
  usuario: Usuario;
}
