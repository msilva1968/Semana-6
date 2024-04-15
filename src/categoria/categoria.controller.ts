import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AtualizaCategoriaDTO } from './dto/AtualizaCategoria.dto';
import { CriaCategoriaDTO } from './dto/CriaCategoria.dto';
import { ListaCategoriaDTO } from './dto/ListaCategoria.dto';
import { CategoriaService } from './categoria.service';

@Controller('/categoria')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Post()
  async criaCategoria(@Body() dadosDaCategoria: CriaCategoriaDTO) {
    const categoriaCriada = await this.categoriaService.criaCategoria(dadosDaCategoria);

    return {
      usuario: new ListaCategoriaDTO(categoriaCriada.idcategoria, categoriaCriada.nome),
      messagem: 'Categoria criada com sucesso',
    };
  }

  @Get()
  async listaCategoria() {
    const categoriaSalva = await this.categoriaService.listaCategoria();

    return categoriaSalva;
  }

  @Put('/:idcategoria')
  async atualizaCategoria(
    @Param('idcategoria') idcategoria: string,
    @Body() novosDados: AtualizaCategoriaDTO,
  ) {
    const categoriaAtualizada = await this.categoriaService.atualizaCategoria(
      idcategoria,
      novosDados,
    );

    return {
      categoria: categoriaAtualizada,
      messagem: 'Categoria atualizada com sucesso',
    };
  }

  @Delete('/:idcategoria')
  async removeCatwgoria(@Param('idcategoria') idcategoria: string) {
    const categoriaRemovida = await this.categoriaService.deletaCategoria(idcategoria);

    return {
      autor: categoriaRemovida,
      messagem: 'Categoria removida com suceso',
    };
  }
}