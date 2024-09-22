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
import { AccionesService } from './acciones.service';
import { CreateAccioneDto } from './dto/create-accione.dto';
import { UpdateAccioneDto } from './dto/update-accione.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ValidActions } from 'src/auth/interfaces/validActions';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Acciones')
@ApiBearerAuth()
@Controller('acciones')
export class AccionesController {
  constructor(private readonly accionesService: AccionesService) {}
  @Auth(ValidActions.FindAllaction)
  @Get()
  findAll() {
    return this.accionesService.findAll();
  }
  /*
  @Post()
  create(@Body() createAccioneDto: CreateAccioneDto) {
    return this.accionesService.create(createAccioneDto);
  }


  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.accionesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAccioneDto: UpdateAccioneDto,
  ) {
    return this.accionesService.update(id, updateAccioneDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.accionesService.remove(id);
  }
    */
}
