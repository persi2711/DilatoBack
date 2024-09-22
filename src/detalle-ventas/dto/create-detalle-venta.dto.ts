import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID } from 'class-validator';

export class CreateDetalleVentaDto {
  @IsInt()
  @ApiProperty()
  Cantidad: number;
  @ApiProperty()
  @IsInt()
  Descucento: number;
  @ApiProperty()
  @IsUUID()
  IdArticulo: string;
}
