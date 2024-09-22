import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,
  ) {}
  async create(createPersonaDto: CreatePersonaDto) {
    const persona = await this.personaRepository.create(createPersonaDto);
    const correo = await this.personaRepository.findOne({
      where: { EmailPersona: persona.EmailPersona },
    });
    if (correo) throw new NotFoundException(`Ya existe el correo`);
    this.personaRepository.save(persona);
    return persona;
  }

  async findAll() {
    const persona = await this.personaRepository.find({});
    if (!persona) throw new NotFoundException(`No se encotro la persona`);

    return persona;
  }

  async findOne(Id: string) {
    const persona = await this.personaRepository.findOne({ where: { Id } });
    if (!persona) throw new NotFoundException(`No se encotro la persona`);
    return persona;
  }

  async update(Id: string, updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.personaRepository.findOne({ where: { Id } });
    if (!persona) throw new NotFoundException(`no se encontro la perosona`);
    this.personaRepository.merge(persona, updatePersonaDto);
    return this.personaRepository.save(persona);
  }

  async remove(Id: string) {
    const persona = await this.personaRepository.findOne({ where: { Id } });
    if (!persona) throw new NotFoundException(`no se encontro la perosona`);
    await this.personaRepository.remove(persona);
    return `This action removes a #${Id} persona`;
  }
  async findtype(type: string) {
    const persona = await this.personaRepository.find({
      where: { TipoPersona: type },
    });
    if (!persona)
      throw new NotFoundException(`no se encotraron ese tipo de persona`);
    return persona;
  }
}
