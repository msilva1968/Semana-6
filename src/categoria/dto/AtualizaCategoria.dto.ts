import { IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { CriaCategoriaDTO } from './CriaCategoria.dto';
import { PartialType } from '@nestjs/mapped-types';

export class AtualizaCategoriaDTO extends PartialType(CriaCategoriaDTO) {}