import { IsNotEmpty, MaxLength } from 'class-validator';

export class CriaCategoriaDTO {
  idcategoria: string;

  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @MaxLength(100, { message: 'O nome precisa ter no máximo 100 caracteres!'})
  nome: string;
}