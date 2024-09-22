import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  MinLength,
  IsOptional,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { CreateDetalleVentaDto } from 'src/detalle-ventas/dto/create-detalle-venta.dto';

export class CreateVentaDto {
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
  usuarioId: string;
  @ApiProperty()
  @IsUUID()
  personaId: string;
  @ApiProperty({
    type: [CreateDetalleVentaDto],
    description: 'Detalle del ingreso',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateDetalleVentaDto)
  detalleVenta: CreateDetalleVentaDto[];
}
