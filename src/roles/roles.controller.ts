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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ValidActions } from 'src/auth/interfaces/validActions';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Auth(ValidActions.CreateRol)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }
  @Auth(ValidActions.FindAllRol)
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }
  @Auth(ValidActions.FindOneRol)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.findOne(id);
  }
  @Auth(ValidActions.UpdateRol)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }
  @Auth(ValidActions.DeleteRol)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.remove(id);
  }
  @Auth(ValidActions.ChangeStatusRol)
  @Patch('status/:id')
  ChangeStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.ChangeStatus(id);
  }
}
