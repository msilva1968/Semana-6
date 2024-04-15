import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AtualizaAutorDTO } from './dto/AtualizaAutor.dto';
import { CriaAutorDTO } from './dto/CriaAutor.dto';
import { ListaAutorDTO } from './dto/ListaAutor.dto';
import { AutorService } from './autor.service';

@Controller('/autores')
export class AutorController {
  constructor(private autorService: AutorService) {}

  @Post()
  async criaAutor(@Body() dadosDoAutor: CriaAutorDTO) {
    const autorCriado = await this.autorService.criaAutor(dadosDoAutor);

    return {
      usuario: new ListaAutorDTO(autorCriado.id, autorCriado.nome),
      messagem: 'usuário criado com sucesso',
    };
  }

  @Get()
  async listAutor() {
    const autorSalvo = await this.autorService.listAutor();

    return autorSalvo;
  }

  @Put('/:id')
  async atualizaAutor(
    @Param('id') id: string,
    @Body() novosDados: AtualizaAutorDTO,
  ) {
    const autorAtualizado = await this.autorService.atualizaAutor(
      id,
      novosDados,
    );

    return {
      autor: autorAtualizado,
      messagem: 'Autor atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeAutor(@Param('id') id: string) {
    const autorRemovido = await this.autorService.deletaAutor(id);

    return {
      autor: autorRemovido,
      messagem: 'Autor removido com suceso',
    };
  }
}