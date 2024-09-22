import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsUUID } from 'class-validator';

export class CreateDetalleIngresoDto {
  @IsInt()
  @ApiProperty()
  Cantidad: number;
  @ApiProperty()
  @IsNumber()
  Precio: number;
  @ApiProperty()
  @IsUUID()
  ArticuloId: string;
}
