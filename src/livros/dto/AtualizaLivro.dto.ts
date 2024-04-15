import { IsOptional, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { CriaLivroDTO } from './CriaLivro.dto';
import { PartialType } from '@nestjs/mapped-types';

export class AtualizaLivroDTO extends PartialType(CriaLivroDTO) {}