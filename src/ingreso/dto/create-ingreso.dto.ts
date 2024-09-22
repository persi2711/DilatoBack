import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateDetalleIngresoDto } from 'src/detalle-ingreso/dto/create-detalle-ingreso.dto';

export class CreateIngresoDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  TipoComprobante: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  SerieComprobante: string;
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  NumeroComprobante: string;
  @ApiProperty()
  @IsNumber()
  Impuesto: number;
  @ApiProperty()
  @IsNumber()
  Total: number;
  @ApiProperty()
  @IsUUID()
  PersonaId: string;
  @ApiProperty()
  @IsUUID()
  UsuarioId: string;
  @ApiProperty({
    type: [CreateDetalleIngresoDto],
    description: 'Detalle del ingreso',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateDetalleIngresoDto)
  DetalleIngreso: CreateDetalleIngresoDto[];
}
