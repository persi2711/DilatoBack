import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePersonaDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  TipoPersona: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  NombrePersona: string;
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
  DireccionPersona: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  TelefonoPersona: string;
  @ApiProperty()
  @IsEmail()
  @MaxLength(50)
  EmailPersona: string;
}
