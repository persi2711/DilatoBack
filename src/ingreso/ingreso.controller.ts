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
import { IngresoService } from './ingreso.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { ValidActions } from 'src/auth/interfaces/validActions';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Ingreso')
@ApiBearerAuth()
@Controller('ingreso')
export class IngresoController {
  constructor(private readonly ingresoService: IngresoService) {}
  @Auth(ValidActions.CreateIngreso)
  @Post()
  create(@Body() createIngresoDto: CreateIngresoDto) {
    return this.ingresoService.create(createIngresoDto);
  }
  @Auth(ValidActions.FindAllIngreso)
  @Get()
  findAll() {
    return this.ingresoService.findAll();
  }
  @Auth(ValidActions.FindOneIngreso)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ingresoService.findOne(id);
  }

  @Auth(ValidActions.UpdateIngreso)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateIngresoDto: UpdateIngresoDto,
  ) {
    return this.ingresoService.update(id, updateIngresoDto);
  }
  @Auth(ValidActions.DeleteIngreso)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ingresoService.remove(id);
  }
  @Auth(ValidActions.ChangeStatusIngreso)
  @Patch('status/:id')
  ChangeStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.ingresoService.ChangeStatus(id);
  }
  @Auth(ValidActions.FindByUserIngreso)
  @Get('user:id')
  FindByUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.ingresoService.FindByUser(id);
  }
}
