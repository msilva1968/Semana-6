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
  import { AtualizaLivroDTO } from './dto/AtualizaLivro.dto';
  import { CriaLivroDTO } from './dto/CriaLivro.dto';
  import { LivroEntity } from './livro.entity';
  import { LivroService } from './livro.service';
  
  @Controller('livro')
  export class LivroController {
    constructor(private readonly livroService: LivroService) {}
  
    @Post()
    async criaNovo(@Body() dadosLivro: CriaLivroDTO) {
      const livroCadastrado = await this.livroService.criaLivro(
        dadosLivro,
      );
  
      return {
        mensagem: 'Produto criado com sucesso.',
        produto: livroCadastrado,
      };
    }

    @Get()
    async listaTodos() {
      return this.livroService.listaLivro();
    }
  
    @Put('/:isbn')
    async atualiza(
      @Param('isbn') isbn: string,
      @Body() dadosLivro: AtualizaLivroDTO,
    ) {
      const livroAlterado = await this.livroService.atualizaLivro(
        isbn,
        dadosLivro,
      );
  
      return {
        mensagem: 'Livro atualizado com sucesso',
        produto: livroAlterado,
      };
    }
  
    @Delete('/:isbn')
    async remove(@Param('isbn') isbn: string) {
      const livroRemovido = await this.livroService.deletaLivro(isbn);
  
      return {
        mensagem: 'Livro excluido com sucesso',
        livro: livroRemovido,
      };
    }
  }  