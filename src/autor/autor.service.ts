import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaAutorDTO } from './dto/ListaAutor.dto';
import { AutorEntity } from './autor.entity';
import { Repository } from 'typeorm';
import { AtualizaAutorDTO } from './dto/AtualizaAutor.dto';
import { CriaAutorDTO } from './dto/CriaAutor.dto';

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(AutorEntity)
    private readonly autorRepository: Repository<AutorEntity>,
  ) {}

  async criaAutor(dadosDoAutor: CriaAutorDTO) {
    const autorEntity = new AutorEntity();

    Object.assign(autorEntity, dadosDoAutor as AutorEntity);

    return this.autorRepository.save(autorEntity);
  }

  async listAutor() {
    const autorSalvo = await this.autorRepository.find();
    const autorLista = autorSalvo.map(
      (autor) => new ListaAutorDTO(autor.id, autor.nome),
    );
    return autorLista;
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.autorRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }

  async atualizaAutor(id: string, novosDados: AtualizaAutorDTO) {
    const autor = await this.autorRepository.findOneBy({ id });

    if (autor === null)
      throw new NotFoundException('O Autor não foi encontrado.');

    Object.assign(autor, novosDados as AutorEntity);

    return this.autorRepository.save(autor);
  }

  async deletaAutor(id: string) {
    const resultado = await this.autorRepository.delete(id);

    if (!resultado.affected)
      throw new NotFoundException('O Autor não foi encontrado.');
  }
}