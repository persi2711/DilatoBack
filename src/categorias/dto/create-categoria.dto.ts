import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  minLength,
} from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  NombreCategoria: string;
  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(350)
  @MinLength(1)
  Descripcion?: string;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  Estado: boolean;
}
