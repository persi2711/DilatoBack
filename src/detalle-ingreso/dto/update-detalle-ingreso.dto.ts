import { PartialType } from '@nestjs/swagger';
import { CreateDetalleIngresoDto } from './create-detalle-ingreso.dto';

export class UpdateDetalleIngresoDto extends PartialType(
  CreateDetalleIngresoDto,
) {}
