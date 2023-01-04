import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn 
} from 'typeorm';

@Entity('categories')
class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
};

export { Category };