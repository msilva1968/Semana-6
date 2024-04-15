import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaLivroDTO } from './dto/Listalivro.dto';
import { LivroEntity } from './livro.entity';
import { Repository } from 'typeorm';
import { AtualizaLivroDTO } from './dto/AtualizaLivro.dto';
import { CriaLivroDTO } from './dto/CriaLivro.dto';

@Injectable()
export class LivroService {
  constructor(
    @InjectRepository(LivroEntity)
    private readonly livroRepository: Repository<LivroEntity>,
  ) {}

  async criaLivro(dadosLivro: CriaLivroDTO) {
    const livroEntity = new LivroEntity();

    Object.assign(livroEntity, dadosLivro as LivroEntity);

    return this.livroRepository.save(livroEntity);
  }

  async listaLivro() {
    const livroSalvo = await this.livroRepository.find();

    const livroLista = livroSalvo.map(
      (livro) =>
        new ListaLivroDTO(
          livro.titulo,
          livro.sinopse,
        ),
    );
    return livroLista;
  }

  async atualizaLivro(isbn: string, novosDados: AtualizaLivroDTO) {
    const entityName = await this.livroRepository.findOneBy({ isbn });

    if (entityName === null) {
      throw new NotFoundException('O Livro não foi encontrado');
    }

    Object.assign(entityName, novosDados as LivroEntity);

    return this.livroRepository.save(entityName);
  }

  async deletaLivro(isbn: string) {
  const resultado = await this.livroRepository.delete(isbn);

  if (!resultado.affected) {
    throw new NotFoundException('O Livro não foi encontrado');
  }
}
}
