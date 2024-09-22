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
import { ArticulosService } from './articulos.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ValidActions } from 'src/auth/interfaces/validActions';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Articulos')
@Controller('articulos')
@ApiBearerAuth()
export class ArticulosController {
  constructor(private readonly articulosService: ArticulosService) {}
  @Auth(ValidActions.CreateArticulo)
  @Post()
  create(@Body() createArticuloDto: CreateArticuloDto) {
    return this.articulosService.create(createArticuloDto);
  }
  @Auth(ValidActions.FindAllArticulo)
  @Get()
  findAll() {
    return this.articulosService.findAll();
  }
  @Auth(ValidActions.FindOneArticulo)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.articulosService.findOne(id);
  }
  @Auth(ValidActions.UpdateArticulo)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArticuloDto: UpdateArticuloDto,
  ) {
    return this.articulosService.update(id, updateArticuloDto);
  }
  @Auth(ValidActions.DeleteArticulo)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.articulosService.remove(id);
  }
  @Auth(ValidActions.ChangeStatusArticulo)
  @Patch('status/:id')
  ChangeStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.articulosService.ChangeStatus(id);
  }
}
