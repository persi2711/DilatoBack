import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Repository } from 'typeorm';
import { Articulo } from './entities/articulo.entity';

@Injectable()
export class ArticulosService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRespository: Repository<Categoria>,
    @InjectRepository(Articulo)
    private readonly articuloRespository: Repository<Articulo>,
  ) {}
  async create(createArticuloDto: CreateArticuloDto) {
    try {
      const codigoArticulo = await this.articuloRespository.findOne({
        where: { CodigoArticulo: createArticuloDto.CodigoArticulo },
      });
      if (codigoArticulo)
        throw new NotFoundException(`ya existe un articulo con ese nombre`);
      const nombreArticulo = await this.articuloRespository.findOne({
        where: { NombreArticulo: createArticuloDto.NombreArticulo },
      });
      if (nombreArticulo)
        throw new NotFoundException(`ya existe un articulo con ese nombre`);
      createArticuloDto.Estado = true;
      const {
        IdCategoria,
        CodigoArticulo,
        NombreArticulo,
        PrecioVenta,
        Stock,
        DescripcionArticulo,
        Estado,
      } = createArticuloDto;
      const categoria = await this.categoriaRespository.findOne({
        where: { Id: IdCategoria },
      });
      if (!categoria) {
        throw new NotFoundException(`categoria no existe`);
      }
      const articulo = await this.articuloRespository.create({
        CodigoArticulo,
        NombreArticulo,
        PrecioVenta,
        Stock,
        DescripcionArticulo,
        Estado,
        categoria,
      });
      await this.articuloRespository.save(articulo);
      return articulo;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const articulos = await this.articuloRespository.find({
      relations: ['categoria'],
    });
    return articulos;
  }

  async findOne(Id: string) {
    const articulo = await this.articuloRespository.findOne({
      where: { Id },
      relations: ['categoria'],
    });
    return articulo;
  }

  async update(Id: string, updateArticuloDto: UpdateArticuloDto) {
    const articulo = await this.articuloRespository.findOne({ where: { Id } });

    if (!articulo) {
      throw new NotFoundException('Articulo no encotrado');
    }
    if (
      updateArticuloDto.NombreArticulo &&
      updateArticuloDto.NombreArticulo !== articulo.NombreArticulo
    ) {
      const nombreArticulo = await this.articuloRespository.findOne({
        where: { NombreArticulo: updateArticuloDto.NombreArticulo },
      });
      if (nombreArticulo)
        throw new NotFoundException(`ya existe un articulo con ese nombre`);
    }
    if (
      updateArticuloDto.CodigoArticulo &&
      updateArticuloDto.CodigoArticulo !== articulo.CodigoArticulo
    ) {
      const codigoArticulo = await this.articuloRespository.findOne({
        where: { CodigoArticulo: updateArticuloDto.CodigoArticulo },
      });
      if (codigoArticulo)
        throw new NotFoundException(`ya existe un articulo con ese nombre`);
    }
    if (updateArticuloDto.IdCategoria) {
      const categoria = await this.categoriaRespository.findOne({
        where: { Id: updateArticuloDto.IdCategoria },
      });
      if (!categoria) {
        throw new NotFoundException('Categoria no encotrada');
      }
      articulo.categoria = categoria;
    }
    this.articuloRespository.merge(articulo, updateArticuloDto);
    return this.articuloRespository.save(articulo);
  }
  async remove(Id: string) {
    const articulo = await this.articuloRespository.findOne({ where: { Id } });
    if (!articulo) {
      throw new NotFoundException('Articulo no encotrado');
    }
    await this.articuloRespository.remove(articulo);
    return `Se removio el articulo` + Id;
  }
  async ChangeStatus(Id: string) {
    const articulo = await this.articuloRespository.findOne({ where: { Id } });
    articulo.Estado = !articulo.Estado;
    return this.articuloRespository.save(articulo);
  }
}
