import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRespository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const nombreCategoria = await this.categoriaRespository.findOne({
        where: { NombreCategoria: createCategoriaDto.NombreCategoria },
      });
      if (nombreCategoria)
        throw new InternalServerErrorException(`ya existe la categoria`);
      createCategoriaDto.Estado = true;
      const categoria = this.categoriaRespository.create(createCategoriaDto);
      await this.categoriaRespository.save(categoria);

      return categoria;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return this.categoriaRespository.findBy({});
  }

  async findOne(Id: string) {
    const categoria = await this.categoriaRespository.findOneBy({ Id });
    if (!categoria) {
      throw new NotFoundException(`No se encontro el producto`);
    }
    return categoria;
  }

  async update(Id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.categoriaRespository.preload({
      Id: Id,
      ...updateCategoriaDto,
    });
    if (!categoria) throw new NotFoundException(`Categoria Id No es correcto`);
    if (
      updateCategoriaDto.NombreCategoria &&
      updateCategoriaDto.NombreCategoria !== categoria.NombreCategoria
    ) {
      const nombreCategoria = await this.categoriaRespository.findOne({
        where: { NombreCategoria: updateCategoriaDto.NombreCategoria },
      });
      if (nombreCategoria)
        throw new InternalServerErrorException(`ya existe la categoria`);
    }
    try {
      await this.categoriaRespository.save(categoria);
      return categoria;
    } catch (error) {
      return error;
    }
  }

  async remove(Id: string) {
    const categoria = await this.categoriaRespository.findOneBy({ Id });
    await this.categoriaRespository.remove(categoria);
    return `Se removio #${Id} categoria`;
  }
  async ChangeStatus(Id: string) {
    const categoria = await this.categoriaRespository.findOneBy({ Id });
    categoria.Estado = !categoria.Estado;
    return this.categoriaRespository.save(categoria);
  }
}
