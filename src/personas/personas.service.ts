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
    const numeroDocumento = await await this.personaRepository.findOne({
      where: { NumeroDocumento: persona.NumeroDocumento },
    });
    const TelefonoPersona = await await this.personaRepository.findOne({
      where: { TelefonoPersona: persona.TelefonoPersona },
    });
    if (correo) throw new NotFoundException(`Ya existe el correo`);
    if (numeroDocumento)
      throw new NotFoundException(`Ya Una persona con ese documento`);
    if (TelefonoPersona)
      throw new NotFoundException(`Ya Una persona con ese documento`);
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
    if (updatePersonaDto.EmailPersona) {
      const correo = await this.personaRepository.findOne({
        where: { EmailPersona: updatePersonaDto.EmailPersona },
      });
      if (correo.Id !== persona.Id)
        throw new NotFoundException(`Ya existe el correo`);
    }
    if (updatePersonaDto.NumeroDocumento) {
      const numeroDocumento = await this.personaRepository.findOne({
        where: { NumeroDocumento: updatePersonaDto.NumeroDocumento },
      });
      if (numeroDocumento.Id !== persona.Id)
        throw new NotFoundException(`Ya existe ses numero de documento`);
    }
    if (updatePersonaDto.TelefonoPersona) {
      const telefonoPersona = await this.personaRepository.findOne({
        where: { TelefonoPersona: updatePersonaDto.TelefonoPersona },
      });
      if (telefonoPersona.Id !== persona.Id)
        throw new NotFoundException(`Ya existe ses numero de documento`);
    }

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
