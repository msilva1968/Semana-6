import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CriaLivroDTO {
  isbn: string;

  @IsNotEmpty({ message: 'O título não pode ser vazio!' })
  titulo: string;

  @IsNotEmpty({ message: 'A sinopse não pode ser vazia!' })
  @MinLength(100, { message: 'A sinopse precisa ter pelo menos 100 caracteres!' })
  @MaxLength(500, { message: 'A sinopse precisa ter no máximo 500 caracteres!'})
  sinopse: string;

  @IsNotEmpty({ message: 'O sumario não pode ser vazio!' })
  @MinLength(100, { message: 'O sumario precisa ter pelo menos 100 caracteres!' })
  @MaxLength(500, { message: 'O sumario precisa ter no máximo 500 caracteres!'})
  sumario: string;

  @IsNotEmpty({ message: 'O preço não pode ser vazio!' })
  preco: number;

  @IsNotEmpty({ message: 'O preço não pode ser vazio!' })
  publicacao: Date;

  @IsNotEmpty({ message: 'O sumario não pode ser vazio!' })
  idcategoria: string;

  @IsNotEmpty({ message: 'O sumario não pode ser vazio!' })
  idautor: string;

}