import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  NombreUsuario: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  TipoDocumento: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  NumeroDocumento: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  Direccion: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  Telefono: string;
  @ApiProperty()
  @IsEmail()
  @MaxLength(50)
  Email: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  Password: string;
  @ApiProperty()
  @IsUUID()
  RoleId: string;
}
