import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ValidActions } from 'src/auth/interfaces/validActions';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Categorias')
@ApiBearerAuth()
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}
  @Auth(ValidActions.CreateCategoria)
  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }
  @Auth(ValidActions.FindAllCategoria)
  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }
  @Auth(ValidActions.FindOneCategoria)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriasService.findOne(id);
  }
  @Auth(ValidActions.UpdateCategoria)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }
  @Auth(ValidActions.DeleteCategoria)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriasService.remove(id);
  }
  @Auth(ValidActions.ChangeStatusCategoria)
  @Patch('status/:id')
  ChangeStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriasService.ChangeStatus(id);
  }
}
