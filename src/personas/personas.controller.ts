import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { ValidActions } from 'src/auth/interfaces/validActions';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Personas')
@ApiBearerAuth()
@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}
  @Auth(ValidActions.CreatePersona)
  @Post()
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personasService.create(createPersonaDto);
  }
  @Auth(ValidActions.FindAllPersona)
  @Get()
  findAll() {
    return this.personasService.findAll();
  }
  @Auth(ValidActions.FindOnePersona)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.personasService.findOne(id);
  }
  @Auth(ValidActions.FindTypePersona)
  @Get(':type')
  findType(@Param('type') type: string) {
    return this.personasService.findtype(type);
  }
  @Auth(ValidActions.UpdatePersona)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ) {
    return this.personasService.update(id, updatePersonaDto);
  }
  @Auth(ValidActions.DeletePersona)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.personasService.remove(id);
  }
}
