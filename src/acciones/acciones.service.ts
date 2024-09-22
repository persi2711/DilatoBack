import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccioneDto } from './dto/create-accione.dto';
import { UpdateAccioneDto } from './dto/update-accione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accione } from './entities/accione.entity';
import { Repository } from 'typeorm';
import { Modulo } from 'src/modulo/entities/modulo.entity';

@Injectable()
export class AccionesService {
  constructor(
    @InjectRepository(Accione)
    private accioneRepository: Repository<Accione>,
    @InjectRepository(Modulo)
    private moduloRepository: Repository<Modulo>,
  ) {}
  async create(createAccioneDto: CreateAccioneDto) {
    const { Nombre, Idmodulo } = createAccioneDto;
    const modulo = await this.moduloRepository.findOne({
      where: { Id: Idmodulo },
    });
    if (!modulo) {
      throw new NotFoundException(`no se encontro el modulo`);
    }
    const accion = await this.accioneRepository.create({ Nombre, modulo });
    await this.accioneRepository.save(accion);
    return accion;
  }

  async findAll() {
    const acciones = await this.accioneRepository.find({
      relations: ['modulo'],
    });
    if (!acciones) return 'no hat acciones';
    return acciones;
  }

  async findOne(Id: string) {
    const accion = await this.accioneRepository.findOne({
      where: { Id },
      relations: ['modulo'],
    });
    if (!accion) throw new NotFoundException(`No se encotro la accion`);
    return accion;
  }

  async update(Id: string, updateAccioneDto: UpdateAccioneDto) {
    const accion = await this.accioneRepository.findOne({ where: { Id } });
    if (!accion) throw new NotFoundException(`no se encotro la accion`);
    if (updateAccioneDto.Idmodulo) {
      const modulo = await this.moduloRepository.findOne({
        where: { Id: updateAccioneDto.Idmodulo },
      });
      if (!modulo) throw new NotFoundException(`no se encontro el modulo`);
      accion.modulo = modulo;
    }
    this.accioneRepository.merge(accion, updateAccioneDto);
    return this.accioneRepository.save(accion);
  }

  async remove(Id: string) {
    const accion = await this.accioneRepository.findOne({ where: { Id } });
    if (!accion) throw new NotFoundException(`no se encotro la accion`);
    this.accioneRepository.remove(accion);
    return `This action removes a #${Id} accione`;
  }
}
