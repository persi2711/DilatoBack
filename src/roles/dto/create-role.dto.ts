import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  NombreRol: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @MinLength(1)
  DescripcionRol?: string;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  accioneId?: string[];
}
