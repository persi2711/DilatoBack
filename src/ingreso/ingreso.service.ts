import { Persona } from './../personas/entities/persona.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { In, Repository } from 'typeorm';
import { Ingreso } from './entities/ingreso.entity';
import { UpdateAccioneDto } from '../acciones/dto/update-accione.dto';
import { DetalleIngreso } from '../detalle-ingreso/entities/detalle-ingreso.entity';
import { Articulo } from 'src/articulos/entities/articulo.entity';

@Injectable()
export class IngresoService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,
    @InjectRepository(Ingreso)
    private ingresoRepository: Repository<Ingreso>,
    @InjectRepository(DetalleIngreso)
    private detalleingresoRepository: Repository<DetalleIngreso>,
    @InjectRepository(Articulo)
    private articuloRepository: Repository<Articulo>,
  ) {}
  async create(createIngresoDto: CreateIngresoDto) {
    const ingreso = await this.ingresoRepository.create(createIngresoDto);
    if (!ingreso) throw new NotFoundException(`no se puede crear el ingreso`);
    const usuario = await this.usuarioRepository.findOne({
      where: { Id: createIngresoDto.UsuarioId },
    });
    const persona = await this.personaRepository.findOne({
      where: { Id: createIngresoDto.PersonaId },
    });
    const numeroComprobante = await this.ingresoRepository.findOne({
      where: { NumeroComprobante: createIngresoDto.NumeroComprobante },
    });
    if (numeroComprobante)
      throw new NotFoundException(
        `Ya existe un ingreso con ese numero de comprobante`,
      );

    if (!usuario || !persona)
      throw new NotFoundException(`no se encotraron la persona o usuario`);
    ingreso.Estado = true;
    ingreso.persona = persona;
    ingreso.usuario = usuario;
    ingreso.FechaHoraIngreso = Date();
    const nuevoIngreso = await this.ingresoRepository.save(ingreso);
    if (createIngresoDto.DetalleIngreso) {
      for (const detalles of createIngresoDto.DetalleIngreso) {
        const articulo = await this.articuloRepository.findOne({
          where: { Id: detalles.ArticuloId },
        });
        if (!articulo) throw new NotFoundException(`No se encotro el articulo`);
        const nuevoDetalleingreso = this.detalleingresoRepository.create({
          articulo: articulo,
          ingreso: nuevoIngreso,
          Cantidad: detalles.Cantidad,
          Precio: detalles.Precio,
        });
        await this.detalleingresoRepository.save(nuevoDetalleingreso);
      }
    }

    return nuevoIngreso;
  }

  async findAll() {
    const ingresos = await this.ingresoRepository.find({
      relations: ['persona', 'usuario', 'detalleIngreso'],
    });
    if (!ingresos) return `no hay ingresos`;
    return ingresos;
  }

  async findOne(Id: string) {
    const ingreso = await this.ingresoRepository.findOne({
      where: { Id },
      relations: ['persona', 'usuario', 'detalleIngreso'],
    });
    if (!ingreso) throw new NotFoundException(`no se encotro el ingreso`);
    return ingreso;
  }

  async update(Id: string, updateIngresoDto: UpdateIngresoDto) {
    const ingreso = await this.ingresoRepository.findOne({ where: { Id } });
    if (!ingreso) throw new NotFoundException(`no se encotro el ingreso`);
    if (
      updateIngresoDto.NumeroComprobante &&
      updateIngresoDto.NumeroComprobante !== ingreso.NumeroComprobante
    ) {
      const numeroComprobante = await this.ingresoRepository.findOne({
        where: { NumeroComprobante: updateIngresoDto.NumeroComprobante },
      });
      if (numeroComprobante)
        throw new NotFoundException(
          `Ya existe un ingreso con ese numero de comprobante`,
        );
    }
    if (updateIngresoDto.PersonaId) {
      const persona = await this.personaRepository.findOne({
        where: { Id: updateIngresoDto.PersonaId },
      });
      if (!persona) throw new NotFoundException(`No se encotro la persona`);
      ingreso.persona = persona;
    }
    if (updateIngresoDto.UsuarioId) {
      const usuario = await this.usuarioRepository.findOne({
        where: { Id: updateIngresoDto.UsuarioId },
      });
      if (!usuario) throw new NotFoundException(`No se encotro el usuario`);
      ingreso.usuario = usuario;
    }
    if (
      updateIngresoDto.DetalleIngreso &&
      updateIngresoDto.DetalleIngreso.length !== 0
    ) {
      const oldDetalles = await this.detalleingresoRepository.find({
        where: { ingreso: ingreso },
      });
      if (oldDetalles.length !== 0) {
        for (const detelles of oldDetalles) {
          this.detalleingresoRepository.remove(detelles);
        }
      }
      for (const detalles of updateIngresoDto.DetalleIngreso) {
        const articulo = await this.articuloRepository.findOne({
          where: { Id: detalles.ArticuloId },
        });
        if (!articulo) throw new NotFoundException(`No se encotro el articulo`);
        const nuevoDetalleingreso = this.detalleingresoRepository.create({
          articulo: articulo,
          ingreso: ingreso,
          Cantidad: detalles.Cantidad,
          Precio: detalles.Precio,
        });
        await this.detalleingresoRepository.save(nuevoDetalleingreso);
      }
    }

    await this.ingresoRepository.merge(ingreso, updateIngresoDto);
    return this.ingresoRepository.save(ingreso);
  }

  async remove(Id: string) {
    const ingreso = await this.ingresoRepository.findOne({ where: { Id } });
    if (!ingreso) throw new NotFoundException(`no se encotro el ingreso`);
    const oldDetalles = await this.detalleingresoRepository.find({
      where: { ingreso: ingreso },
    });
    if (oldDetalles.length !== 0) {
      for (const detelles of oldDetalles) {
        this.detalleingresoRepository.remove(detelles);
      }
    }
    await this.ingresoRepository.remove(ingreso);
    return 'se elimino el ingreso';
  }
  async ChangeStatus(Id: string) {
    const ingreso = await this.ingresoRepository.findOne({ where: { Id } });
    ingreso.Estado = !ingreso.Estado;
    return this.ingresoRepository.save(ingreso);
  }
  async FindByUser(Id: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { Id } });
    if (!usuario) throw new NotFoundException(`no se encotro el usuario`);
    return await this.ingresoRepository.find({ where: { usuario: usuario } });
  }
}
