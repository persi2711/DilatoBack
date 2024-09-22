import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(Modulo)
    private moduloRepository: Repository<Modulo>,
  ) {}
  async create(createModuloDto: CreateModuloDto) {
    createModuloDto.Estado = true;
    const modulo = await this.moduloRepository.create(createModuloDto);
    if (!modulo) throw new NotFoundException(`Modulo no valida`);
    this.moduloRepository.save(modulo);
    return modulo;
  }

  async findAll() {
    const modulo = await this.moduloRepository.find({});
    if (!modulo) return 'no hay modulos';
    return modulo;
  }

  async findOne(Id: string) {
    const modulos = await this.moduloRepository.findOne({ where: { Id } });
    if (!modulos) throw new NotFoundException(`no se encontro el modulo`);
    return modulos;
  }

  async update(Id: string, updateModuloDto: UpdateModuloDto) {
    const modulo = await this.moduloRepository.findOne({ where: { Id } });
    if (!modulo) throw new NotFoundException(`no se encontro el modulo`);
    this.moduloRepository.merge(modulo, updateModuloDto);
    return this.moduloRepository.save(modulo);
  }

  async remove(Id: string) {
    const modulo = await this.moduloRepository.findOne({ where: { Id } });
    if (!modulo) throw new NotFoundException(`no se encontro el modulo`);
    await this.moduloRepository.remove(modulo);
    return `This action removes a #${Id} modulo`;
  }

  async ChangeStatus(Id: string) {
    const modulo = await this.moduloRepository.findOne({ where: { Id } });
    modulo.Estado = !modulo.Estado;
    return this.moduloRepository.save(modulo);
  }
}
