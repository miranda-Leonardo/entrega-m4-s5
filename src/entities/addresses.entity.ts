import {
    Column,
    Entity, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Property } from './properties.entity';

@Entity('addresses')
class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    district: string;

    @Column({ length: 8 })
    zipCode: string;

    @Column({ nullable: true })
    number?: string;

    @Column()
    city: string;

    @Column({ length: 2 })
    state: string;

    @OneToOne( () => Property )
    property: Property;
};

export { Address };