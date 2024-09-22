import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from 'src/personas/entities/persona.entity';
import { Articulo } from 'src/articulos/entities/articulo.entity';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from 'src/detalle-ventas/entities/detalle-venta.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,
    @InjectRepository(Articulo)
    private articuloRepository: Repository<Articulo>,
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
    @InjectRepository(DetalleVenta)
    private detalleventaRepository: Repository<DetalleVenta>,
  ) {}
  async create(createVentaDto: CreateVentaDto) {
    const venta = await this.ventaRepository.create(createVentaDto);
    if (!venta)
      throw new InternalServerErrorException(`no se pudo crear la venta`);
    const usuario = await this.usuarioRepository.findOne({
      where: { Id: createVentaDto.usuarioId },
    });
    if (!usuario) throw new NotFoundException(`no se encotro el usuario`);
    const persona = await this.personaRepository.findOne({
      where: { Id: createVentaDto.personaId },
    });
    if (!persona) throw new NotFoundException(`no se encotro la persona`);
    venta.Estado = true;
    venta.persona = persona;
    venta.usuario = usuario;
    venta.FechaHora = Date();

    const nuevaVenta = await this.ventaRepository.save(venta);
    if (createVentaDto.detalleVenta) {
      for (const detalles of createVentaDto.detalleVenta) {
        const articulo = await this.articuloRepository.findOne({
          where: { Id: detalles.IdArticulo },
        });
        if (!articulo) throw new NotFoundException(`No se encotro el articulo`);
        const nuevoDetalleVenta = this.detalleventaRepository.create({
          articulo: articulo,
          venta: nuevaVenta,
          Cantidad: detalles.Cantidad,
          Descucento: detalles.Descucento,
        });
        await this.detalleventaRepository.save(nuevoDetalleVenta);
      }
    }
    return nuevaVenta;
  }

  async findAll() {
    const ventas = await this.ventaRepository.find({
      relations: ['usuario', 'persona', 'detalleVenta'],
    });
    if (!ventas) return 'no hay ventas';
    return ventas;
  }

  async findOne(Id: string) {
    const venta = await this.ventaRepository.findOne({
      where: { Id },
      relations: ['usuario', 'persona', 'detalleVenta'],
    });
    if (!venta) throw new NotFoundException(`no se encontro la venta`);
    return venta;
  }

  async update(Id: string, updateVentaDto: UpdateVentaDto) {
    const venta = await this.ventaRepository.findOne({ where: { Id } });
    if (!venta) throw new NotFoundException(`no se encotro la venta`);
    if (updateVentaDto.personaId) {
      const persona = await this.personaRepository.findOne({
        where: { Id: updateVentaDto.personaId },
      });
      if (!persona) throw new NotFoundException(`no se encotro la persona`);
      venta.persona = persona;
    }
    if (updateVentaDto.usuarioId) {
      const usuario = await this.usuarioRepository.findOne({
        where: { Id: updateVentaDto.usuarioId },
      });
      if (!usuario) throw new NotFoundException(`no se encotro el usuario`);
      venta.usuario = usuario;
    }
    if (
      updateVentaDto.detalleVenta &&
      updateVentaDto.detalleVenta.length !== 0
    ) {
      const oldDetalles = await this.detalleventaRepository.find({
        where: { venta: venta },
      });
      if (oldDetalles.length !== 0) {
        for (const detalle of oldDetalles) {
          this.detalleventaRepository.remove(detalle);
        }
      }
      for (const detalles of updateVentaDto.detalleVenta) {
        const articulo = await this.articuloRepository.findOne({
          where: { Id: detalles.IdArticulo },
        });
        if (!articulo) throw new NotFoundException(`No se encotro el articulo`);
        const nuevoDetalleVenta = this.detalleventaRepository.create({
          articulo: articulo,
          venta: venta,
          Cantidad: detalles.Cantidad,
          Descucento: detalles.Descucento,
        });
        await this.detalleventaRepository.save(nuevoDetalleVenta);
      }
    }
    await this.ventaRepository.merge(venta, updateVentaDto);
    return this.ventaRepository.save(venta);
  }

  async remove(Id: string) {
    const venta = await this.ventaRepository.findOne({ where: { Id } });
    if (!venta) throw new NotFoundException(`no se encotro la venta`);
    const oldDetalles = await this.detalleventaRepository.find({
      where: { venta: venta },
    });
    if (oldDetalles.length !== 0) {
      for (const detalle of oldDetalles) {
        this.detalleventaRepository.remove(detalle);
      }
    }
    await this.ventaRepository.remove(venta);
    return `This action removes a #${Id} venta`;
  }
  async ChangeStatus(Id: string) {
    const venta = await this.ventaRepository.findOne({ where: { Id } });
    venta.Estado = !venta.Estado;
    return this.ventaRepository.save(venta);
  }
}
