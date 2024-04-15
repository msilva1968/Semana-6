import { IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class AtualizaCategoriaDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @MaxLength(100, { message: 'O nome precisa ter no máximo 100 caracteres!'})
  @IsOptional()
  nome: string;
}
