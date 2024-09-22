import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateModuloDto {
  @MaxLength(50)
  @MinLength(1)
  @IsString()
  Nombre: string;
  @IsString()
  @IsOptional()
  @MaxLength(350)
  @MinLength(1)
  Descripcion?: string;
  @IsBoolean()
  @IsOptional()
  Estado?: boolean;
}
