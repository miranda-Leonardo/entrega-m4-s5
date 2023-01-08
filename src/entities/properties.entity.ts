import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Address } from './addresses.entity';
import { Category } from './categories.entity';
import { Schudele } from './schudeles.entity';

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
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Category, category => category.id)
    category: Category;

    @OneToMany( () => Schudele, schudele => schudele.property )
    schudeles: Schudele[];
};

export { Property };