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
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ValidActions } from 'src/auth/interfaces/validActions';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Ventas')
@ApiBearerAuth()
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}
  @Auth(ValidActions.CreateVenta)
  @Post()
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }
  @Auth(ValidActions.FindAllVenta)
  @Get()
  findAll() {
    return this.ventasService.findAll();
  }
  @Auth(ValidActions.FindOneVenta)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ventasService.findOne(id);
  }
  @Auth(ValidActions.UpdateVenta)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVentaDto: UpdateVentaDto,
  ) {
    return this.ventasService.update(id, updateVentaDto);
  }
  @Auth(ValidActions.DeleteVenta)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ventasService.remove(id);
  }
  @Auth(ValidActions.ChangeStatusVenta)
  @Patch('status/:id')
  ChangeStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.ventasService.ChangeStatus(id);
  }
  @Auth(ValidActions.FindByUserVenta)
  @Get(':id')
  FindByUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.ventasService.FindByUser(id);
  }
}
