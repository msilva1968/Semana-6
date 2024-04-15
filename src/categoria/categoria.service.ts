import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaCategoriaDTO } from './dto/ListaCategoria.dto';
import { CategoriaEntity } from './categoria.entity';
import { Repository } from 'typeorm';
import { AtualizaCategoriaDTO } from './dto/AtualizaCategoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>,
  ) {}

  async criaCategoria(categoriaEntity: CategoriaEntity) {
    await this.categoriaRepository.save(categoriaEntity);
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
    const entityName = await this.categoriaRepository.findOneBy({ idcategoria });
    Object.assign(entityName, novosDados);
    await this.categoriaRepository.save(entityName);
  }

  async deletaCategoria(idcategoria: string) {
    await this.categoriaRepository.delete(idcategoria);
  }
}