import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateAccioneDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  Nombre: string;
  @IsUUID()
  Idmodulo: string;
}
