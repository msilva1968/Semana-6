import { Module } from '@nestjs/common';
import { LivroController } from './livro.controller';
import { LivroEntity } from './livro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivroService } from './livro.service';

@Module({
  imports: [TypeOrmModule.forFeature([LivroEntity])],
  controllers: [LivroController],
  providers: [LivroService],
})
export class LivroModule {}