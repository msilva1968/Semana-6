import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaCategoriaDTO } from './dto/ListaCategoria.dto';
import { CategoriaEntity } from './categoria.entity';
import { Repository } from 'typeorm';
import { AtualizaCategoriaDTO } from './dto/AtualizaCategoria.dto';
import { CriaCategoriaDTO } from './dto/CriaCategoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>,
  ) {}

  async criaCategoria(dadosDaCategoria: CriaCategoriaDTO) {
    const categoriaEntity = new CategoriaEntity();

    Object.assign(categoriaEntity, dadosDaCategoria as CategoriaEntity);

    return this.categoriaRepository.save(categoriaEntity);
  }

  async listaCategoria() {
    const categoriaSalvo = await this.categoriaRepository.find();

    const categoriaLista = categoriaSalvo.map(
      (categoria) =>
        new ListaCategoriaDTO(
          categoria.idcategoria,
          categoria.nome,
        ),
    );
    return categoriaLista;
  }

  async atualizaCategoria(idcategoria: string, novosDados: AtualizaCategoriaDTO) {
    const categoria = await this.categoriaRepository.findOneBy({ idcategoria });

    if (categoria === null)
      throw new NotFoundException('A Categoria não foi encontrada.');

    Object.assign(categoria, novosDados as CategoriaEntity);

    return this.categoriaRepository.save(categoria);
  }

  async deletaCategoria(idcategoria: string) {
    const resultado = await this.categoriaRepository.delete(idcategoria);

    if (!resultado.affected)
      throw new NotFoundException('A Categoria não foi encontrada.');
  }

}