import { Accione } from 'src/acciones/entities/accione.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Modulos' })
export class Modulo {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
  @Column('text', { unique: true })
  Nombre: string;
  @Column('text', { nullable: true })
  Descripcion: string;
  @Column('bool', { default: true })
  Estado: boolean;
  @OneToMany(() => Accione, (accione) => accione.modulo)
  accione: Accione;
}
