import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { randomUUID } from 'crypto';
  import { AtualizaCategoriaDTO } from './dto/AtualizaCategoria.dto';
  import { CriaCategoriaDTO } from './dto/CriaCategoria.dto';
  import { CategoriaEntity } from './categoria.entity';
  import { CategoriaService } from './categoria.service';
  
  @Controller('categoria')
  export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}
  
      @Post()
    async criaNovo(@Body() dadosCategoria: CriaCategoriaDTO) {
      const categoria = new CategoriaEntity();
  
      categoria.idcategoria = randomUUID();
      categoria.nome = dadosCategoria.nome;
  
      const categoriaCadastrado = this.categoriaService.criaCategoria(categoria);
      return categoriaCadastrado;
    }
  
    @Get()
    async listaTodos() {
      return this.categoriaService.listaCategoria();
    }
  
    @Put('/:idcategoria')
    async atualiza(
      @Param('idcategoria') idcategoria: string,
      @Body() dadosCategoria: AtualizaCategoriaDTO,
    ) {
      const categoriaAlterado = await this.categoriaService.atualizaCategoria(
        idcategoria,
        dadosCategoria,
      );
  
      return {
        mensagem: 'Categoria atualizada com sucesso',
        autor: categoriaAlterado,
      };
    }
  
    @Delete('/:idcategoria')
    async remove(@Param('idcategoria') idcategoria: string) {
      const categoriaRemovido = await this.categoriaService.deletaCategoria(idcategoria);
  
      return {
        mensagem: 'Categoria excluida com sucesso',
        livro: categoriaRemovido,
      };
    }
  }  