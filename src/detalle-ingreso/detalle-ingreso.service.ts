import { Injectable } from '@nestjs/common';
import { CreateDetalleIngresoDto } from './dto/create-detalle-ingreso.dto';
import { UpdateDetalleIngresoDto } from './dto/update-detalle-ingreso.dto';

@Injectable()
export class DetalleIngresoService {
  create(createDetalleIngresoDto: CreateDetalleIngresoDto) {
    return 'This action adds a new detalleIngreso';
  }

  findAll() {
    return `This action returns all detalleIngreso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleIngreso`;
  }

  update(id: number, updateDetalleIngresoDto: UpdateDetalleIngresoDto) {
    return `This action updates a #${id} detalleIngreso`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleIngreso`;
  }
}
