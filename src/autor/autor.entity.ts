import { PedidoEntity } from '../pedido/pedido.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'autores' })
export class AutorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'biografia', length: 500, nullable: false })
  biografia: string;

  @CreateDateColumn({ name: 'data' })
  data: Date;
}