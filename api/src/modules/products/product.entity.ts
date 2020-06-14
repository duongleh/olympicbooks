import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, CreateDateColumn } from 'typeorm';
import { Author } from '../authors/author.entity';
import { Publisher } from '../publishers/publisher.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publicationYear: number;

  @Column()
  price: number;

  @Column()
  img: string;

  @Column()
  availableQuantity: number;

  @Column()
  categoryId: number;

  @Column()
  publisherId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => Category, (category) => category.products)
  category: Category;

  @ManyToOne((type) => Publisher, (publisher) => publisher.products)
  publisher: Publisher;

  @ManyToMany((type) => Author)
  @JoinTable()
  authors: Author[];
}
