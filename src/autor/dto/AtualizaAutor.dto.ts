import { CriaAutorDTO } from './CriaAutor.dto';
import { PartialType } from '@nestjs/mapped-types';

export class AtualizaAutorDTO extends PartialType(CriaAutorDTO) {}