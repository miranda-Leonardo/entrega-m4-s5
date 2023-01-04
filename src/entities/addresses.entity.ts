import {
    Column,
    Entity, PrimaryGeneratedColumn
} from 'typeorm';

@Entity('addresses')
class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    district: string;

    @Column()
    zipCode: string;

    @Column()
    number: string;

    @Column()
    city: string;

    @Column()
    state: string;
};

export { Address };