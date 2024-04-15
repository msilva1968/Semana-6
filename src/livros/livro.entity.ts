import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity({ name: 'livros' })
  export class LivroEntity {
    @PrimaryGeneratedColumn('uuid')
    isbn: string;
    
    @Column({ name: 'titulo', length: 100, nullable: false })
    titulo: string;
  
    @Column({ name: 'sinopse', length: 500, nullable: false })
    sinopse: string;
  
    @Column({ name: 'sumario', length: 500, nullable: false })
    sumario: string;

    @Column({ name: 'preco', nullable: false })
    preco: number;

    @Column({ name: 'publicacao', nullable: false })
    publicacao: Date;

    @Column({ name: 'idcategoria', nullable: false })
    idcategoria: string;

    @Column({ name: 'idautor', nullable: false })
    idautor: string;
}