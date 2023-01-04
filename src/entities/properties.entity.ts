import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Address } from './addresses.entity';
import { Category } from './categories.entity';

@Entity('properties')
class Property {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: false })
    sold: boolean;

    @Column({ type: 'float' })
    value: number;

    @Column()
    size: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Category, category => category.id)
    category: Category;
};

export { Property };