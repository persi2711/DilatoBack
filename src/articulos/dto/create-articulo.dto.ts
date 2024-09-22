import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticuloDto {
  @ApiProperty()
  @IsUUID()
  IdCategoria: string;
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  CodigoArticulo: string;
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  NombreArticulo: string;
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  PrecioVenta: number;
  @ApiProperty()
  @IsInt()
  @IsPositive()
  Stock: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(350)
  @MinLength(1)
  DescripcionArticulo?: string;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  Estado?: boolean;
}
