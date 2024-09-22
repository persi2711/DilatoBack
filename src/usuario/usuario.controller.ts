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
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUsuariodto } from './dto/login-usuario.dto';
import { ValidActions } from 'src/auth/interfaces/validActions';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Usuario')
@ApiBearerAuth()
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Auth(ValidActions.CreateUsuario)
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }
  @Auth(ValidActions.FindAllUsuario)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }
  @Auth(ValidActions.FindOneUsuario)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.findOne(id);
  }
  @Auth(ValidActions.UpdateUsuario)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }
  @Auth(ValidActions.DeleteUsuario)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.remove(id);
  }
  @Auth(ValidActions.ChangeStatusUsuario)
  @Patch('status/:id')
  ChangeStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.ChangeStatus(id);
  }
}
