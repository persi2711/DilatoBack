import { Accione } from 'src/acciones/entities/accione.entity';

export interface JwtPayload {
  Id: string;
  Rol: string;
  Permisos: Accione[];
  // TODO: añadir todo lo que quieran grabar.
}
